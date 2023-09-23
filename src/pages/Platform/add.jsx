import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Select,
    Space,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined, SyncOutlined, LeftOutlined, SaveOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { storeItem } from '../../utils/storeItem';
import { nanoID } from "../../utils/nanoID";

import { firestore } from "../../config/firebase";
import { doc, collection, onSnapshot, query, writeBatch, increment, where } from "firebase/firestore";
import { AesEncrypt } from "../../utils/AesEncrypt";
import CheckableTag from "antd/es/tag/CheckableTag";
import { themeBank } from "../../utils/themeBank";
import { avatarText } from "../../utils/AvatarText";
import { currentDateTime } from "../../utils/currentDateTime";



export default function PlatformAdd() {
    const { userId } = storeItem();
    const location = useLocation();
    const categoryId = location?.state?.categoryId;
    const themes = themeBank();
    const fillToastMessage = storeItem((state) => state.fillToastMessage);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const onSearch = (value) => {
        // console.log('search:', value);
    };

    const onChange = (value) => {
        // console.log(`selected ${value}`);
    };

    const onLock = (isLock, key) => {
        let field = form.getFieldsValue("accounts");
        console.log(field.accounts[key].isLock);

        // if (field && Array.isArray(field) && field.length) {
        //     if (field[key]?.value) {
        field.accounts[key].isLock = isLock;
        form.setFieldsValue({ field });
        // }
        // }
    };

    const lockedStatus = (key) => {
        return form.getFieldsValue("accounts")?.accounts[key]?.isLock;
    };

    const getCategories = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "categories"), where("userId", "==", userId));
        onSnapshot(q, (querySnapshot) => {
            let tempCategories = [];
            querySnapshot.forEach((doc) => {
                tempCategories.push({ value: doc.id, label: doc.data().title, total: doc.data().total });
            });

            setCategories(tempCategories);
            // setCategoryId(location?.state?.categoryId);
            setTimeout(() => setLoading(false), 500);
        });
    }

    const [selectedTags, setSelectedTags] = useState(['Books']);
    const handleThemeChange = (tag) => {
        setSelectedTags(tag);

        let field = form.getFieldsValue();
        field.theme = tag;
        form.setFieldsValue(field);
    };

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const setPlatformUID = nanoID();
            const batch = writeBatch(firestore);

            batch.set(doc(firestore, "platforms", setPlatformUID), {
                id: setPlatformUID,
                categoryId: values.category,
                name: values.name,
                aliasName: values.aliasName,
                avatar: avatarText(values.name),
                theme: values.theme,
                userId: userId,
                createdAt: currentDateTime(),
                updatedAt: currentDateTime(),
            });

            values.accounts?.map(val => {
                const setAccountUID = nanoID();
                batch.set(doc(firestore, "accounts", setAccountUID), {
                    id: setAccountUID,
                    platformId: setPlatformUID,
                    categoryId: values.category,
                    label: val.label,
                    value: val.isLock ? AesEncrypt(val.value, "encrypt") : val.value,
                    isLock: val.isLock,
                    valueStrength: 0,
                    userId: userId,
                    createdAt: currentDateTime(),
                    updatedAt: currentDateTime(),
                });
            })

            batch.update(doc(firestore, "categories", values.category), {
                total: increment(1),
            });

            await batch.commit()
                .then(async (res) => {
                    setLoading(false);
                    fillToastMessage(['success', 'Submit success!']);
                    navigate(-1);
                })
        } catch (error) {
            setLoading(false);
            console.error(error);
            fillToastMessage(['error', 'Submit failed!']);
        }
    }

    const onFinishFailed = () => {
        fillToastMessage(['error', 'Submit failed!']);
    };



    return (

        <Content
            style={{
                padding: 24,
                minHeight: '50vh',
                background: '#0a0a0a',
                borderRadius: 16
            }}>

            <Row wrap={false} align="middle">
                <Col flex="none" style={{ position: 'relative', width: 0, height: 0 }}>
                    <Button icon={<LeftOutlined />} onClick={() => navigate(-1)}>Back</Button>
                </Col>
            </Row>
            <Row wrap={false} align="middle" style={{ marginBottom: 50 }}>
                <Col lg={{ offset: 4 }} md={{ offset: 5 }} sm={{ offset: 8 }} offset={1} flex="auto">
                    <Title level={3} style={{ margin: 0 }}>Create New</Title>
                </Col>
            </Row>


            <Form
                labelCol={{
                    sm: {
                        span: 8,
                    },
                    md: {
                        span: 5,
                    },
                    lg: {
                        span: 4,
                    },
                }}
                labelAlign="left"
                // wrapperCol={{
                //     span: 14,
                // }}
                form={form}
                // layout="vertical"
                initialValues={{
                    size: 'default',
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                // onValuesChange={ }
                size={'default'}
                style={{
                    // maxWidth: 600,
                }}
            >

                <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}>Platform</Divider>

                <Form.Item initialValue={categoryId} label="Category" name="category" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please choose Category!',
                    },
                ]} hasFeedback>
                    <Select
                        showSearch
                        placeholder="Select a Category"
                        optionFilterProp="children"
                        onChange={onChange}
                        onSearch={onSearch}
                        filterOption={filterOption}
                        options={categories}
                        disabled={!!categoryId}
                        size="large"
                    />
                </Form.Item>
                <Form.Item label="Name" name="name" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please input Name!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Name here..." size="large" />
                </Form.Item>
                <Form.Item label="Alias Name" name="aliasName" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please input Alias Name!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Alias Name here..." size="large" />
                </Form.Item>

                <Form.Item label="Theme" name="theme" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please input Theme!',
                    },
                ]} hasFeedback>
                    <Space size={[0, 8]} wrap>
                        {themes.map((tag) => (
                            <CheckableTag
                                key={tag}
                                checked={selectedTags.includes(tag)}
                                onChange={(checked) => handleThemeChange(tag)}
                                style={{ padding: 4 }}
                            >
                                <div style={{ background: tag, width: 20, height: 20, borderRadius: 3 }}></div>
                            </CheckableTag>
                        ))}
                    </Space>
                </Form.Item>

                <Divider orientation="left" dashed plain style={{ color: 'lightGrey', marginTop: 50 }}>Account</Divider>

                <Form.List name="accounts">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}>
                                    <Form.Item {...restField} label={`Label ${key + 1}`} name={[name, 'label']} messageVariables={{ another: 'good' }} rules={[
                                        {
                                            required: true,
                                            message: `Please input Label ${key + 1}!`
                                        },
                                    ]} hasFeedback>
                                        <Input placeholder={`Type Label ${key + 1} here...`} size="large" />
                                    </Form.Item >

                                    <Row>
                                        <Col flex={'auto'} style={{ marginRight: 8 }}>
                                            <Form.Item {...restField} label={`Value ${key + 1}`} name={[name, 'value']} messageVariables={{ another: 'good' }} rules={[
                                                {
                                                    required: true,
                                                    message: `Please input Value ${key + 1}!`,
                                                },
                                            ]} hasFeedback>
                                                <Input.Password
                                                    style={
                                                        lockedStatus(key) ? { marginLeft: '3%', width: '96%' } : { marginLeft: '2.5%', width: '96.5%' }
                                                    }
                                                    visibilityToggle={{ visible: !lockedStatus(key) }}
                                                    iconRender={(visible) => (visible ? <UnlockOutlined /> : <LockOutlined />)}
                                                    placeholder={`Type Value ${key + 1} here...`} size="large" />
                                            </Form.Item >
                                        </Col>

                                        <Col>
                                            <Form.Item hidden={false} {...restField} initialValue={false} name={[name, 'isLock']}>
                                                <Button onClick={() => onLock(!lockedStatus(key), key)} icon={!lockedStatus(key) ? <LockOutlined /> : <UnlockOutlined />} size="large" type="primary" >{lockedStatus(key) ? "Unencrpyt" : "Encrypt"}</Button>
                                            </Form.Item >
                                        </Col>
                                    </Row>

                                    <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}></Divider>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Account
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}></Divider>

                <Form.Item label={'Action'} style={{ marginTop: 50 }}>
                    <Space size={'small'}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={loading}
                        // onClick={() => enterLoading(1)}
                        >
                            Save
                        </Button>
                        <Button icon={<SyncOutlined />} onClick={() => form.resetFields()}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </Content >
    );
}