import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Divider, FloatButton, Form, Input, Modal, Row, Select, Space, Tag, Typography } from "antd";
import { LeftOutlined, UnlockOutlined, FileOutlined, LockOutlined, EditOutlined, SaveOutlined, CloseOutlined, UserAddOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { storeItem } from "../../utils/storeItem";

import { firestore } from "../../config/firebase";
import { getDoc, doc, collection, getDocs, updateDoc, query, where, onSnapshot } from "firebase/firestore";
import { AesEncrypt } from "../../utils/AesEncrypt";


export default function PlatformDetail() {
    const navigate = useNavigate();
    let { id } = useParams();
    const location = useLocation();
    // const categoryName = location?.state.categoryName;
    const fillToastMessage = storeItem((state) => state.fillToastMessage);
    const [loading, setLoading] = useState(false);
    const [platform, setPlatform] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [categoryName, setCategoryName] = useState(location?.state.categoryName);
    const [categories, setCategories] = useState([]);
    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    useEffect(() => {
        getPlatform();
        getAccounts();
    }, [])

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const getCategories = async () => {
        // setLoading(true);
        // realtime query
        const q = query(collection(firestore, "categories"));
        onSnapshot(q, (querySnapshot) => {
            let tempCategories = [];
            querySnapshot.forEach((doc) => {
                tempCategories.push({ value: doc.id, label: doc.data().title, total: doc.data().total });
            });

            setCategories(tempCategories);
            // setTimeout(() => setLoading(false), 500);
        });
    }

    const getPlatform = async () => {
        setLoading(true);

        try {
            // non-realtime query
            // const docSnap = await getDoc(doc(firestore, "categories", id));

            // realtime query
            const q = query(doc(firestore, "platforms", id));
            onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.exists()) {
                    setPlatform(querySnapshot.data());
                } else {
                    console.log("No such document!");
                }
            });
        } catch (error) {
            console.log("error get data");
        }

        setLoading(false);
    }

    const getAccounts = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "accounts"), where("platformId", "==", id));
        onSnapshot(q, (querySnapshot) => {
            let tempAccounts = [];
            querySnapshot.forEach((doc) => {
                tempAccounts.push({ id: doc.id, ...doc.data() });
            });
            setAccounts(tempAccounts);
            setTimeout(() => setLoading(false), 500);
        });
    }

    const showModal = () => {
        setOpen(true);
    };


    const handleCancel = () => {
        setOpen(false);
    };

    const setAvatar = (name) => {
        return name.split(" ").length > 1
            ? (name.split(" ")[0][0] + name.split(" ")[1][0]).toUpperCase()
            : name.length > 1 ? name.slice(0, 2).toUpperCase() : name.slice(0, 1).toUpperCase()
    }

    const onFinish = async (values) => {
        setConfirmLoading(true);

        try {
            // Update a document in collection
            updateDoc(doc(firestore, "platforms", platform.id), {
                categoryId: values.category,
                name: values.name,
                aliasName: values.aliasName,
                avatar: setAvatar(values.name),
            }).then(async (res) => {
                setConfirmLoading(false);
                setOpen(false);
                fillToastMessage(['success', 'Submit success!']);
            })
        } catch (error) {
            setConfirmLoading(false);
            setOpen(false);
            fillToastMessage(['error', 'Submit failed!']);
        }
    }

    const onFinishFailed = () => {
        fillToastMessage(['error', 'Submit failed!']);
    };



    return (
        <div
            style={{
                padding: 24,
                minHeight: '50vh',
                borderRadius: 16,
            }}
        >

            <Modal
                title={<Typography.Title level={3} style={{ margin: 0 }}>Update</Typography.Title>}
                open={open}
                onCancel={handleCancel}
                maskClosable={false}
                width={800}
                footer={
                    <Form.Item>
                        <Space size={'small'}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={confirmLoading}
                                onClick={() => form.submit()}
                            >
                                Save
                            </Button>
                            <Button icon={<CloseOutlined />} onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                }
            >
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
                    size={'large'}
                    style={{ marginTop: 50 }}
                >

                    <Form.Item initialValue={platform.categoryId} label="Category" name="category" messageVariables={{ another: 'good' }} rules={[
                        {
                            required: true,
                            message: 'Please choose Category!',
                        },
                    ]} hasFeedback>
                        <Select
                            showSearch
                            placeholder="Select a Category"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={categories}
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item initialValue={platform.name} label="Name" name="name" messageVariables={{ another: 'good' }} rules={[
                        {
                            required: true,
                            message: 'Please input Name!',
                        },
                    ]} hasFeedback>
                        <Input placeholder="Type Name here..." size="large" />
                    </Form.Item>

                    <Form.Item initialValue={platform.aliasName} label="Alias Name" name="aliasName" messageVariables={{ another: 'good' }} rules={[
                        {
                            required: true,
                            message: 'Please input Alias Name!',
                        },
                    ]} hasFeedback>
                        <Input placeholder="Type Alias Name here..." size="large" />
                    </Form.Item>

                    <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}></Divider>
                </Form>
            </Modal>

            <FloatButton
                onClick={() => navigate('/platform/add', { state: { categoryId: id } })}
                shape="circle"
                type="primary"
                style={{
                    right: 32,
                    bottom: 32,
                    width: 60,
                    height: 60,
                }}
                icon={<UserAddOutlined style={{ width: 60, height: 60 }} />}
            />

            <Row wrap={true} justify="space-between" align="top">
                <Col span={6}>
                    <Card
                        bordered={false}
                        style={{
                            // minWidth: 320,
                            borderRadius: 16,
                            marginBottom: 30,
                            background: '#76BA99',
                            // backgroundImage: "linear-gradient(to right, #675bff, #cb83ff)"
                        }}
                        loading={loading}
                    >
                        <Col>
                            <Row wrap={true} justify="space-between" align="middle">
                                <Button type="text" icon={<LeftOutlined />} onClick={() => navigate(-1)}></Button>
                                <Button type="text" icon={<EditOutlined />} onClick={() => (getCategories(), showModal())}></Button>
                            </Row>
                            <Col style={{ marginTop: 20 }}>
                                <Avatar
                                    shape="square"
                                    size={80}
                                    style={{
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        color: 'white',
                                        marginRight: 20,
                                        fontSize: 32
                                    }}
                                >
                                    {platform.avatar}
                                </Avatar>
                                <Typography.Title level={3} style={{ margin: 0, padding: 0, marginTop: 16 }}>{platform.name}</Typography.Title>
                                <Typography.Text level={5} style={{ margin: 0, padding: 0 }}>{platform.aliasName}</Typography.Text>
                            </Col>

                            <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}></Divider>
                            <Tag color="white" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 6, borderWidth: 0.8, borderColor: 'white', padding: '4px 8px' }}>{categoryName}</Tag>

                        </Col>
                    </Card>
                </Col>

                <Col span={17}>
                    <Card
                        bordered={false}
                        style={{
                            minWidth: 320,
                            borderRadius: 16,
                            marginBottom: 30,
                            background: '#181818',
                            // backgroundImage: "linear-gradient(to right, #675bff, #cb83ff)"
                        }}
                        loading={loading}
                    >

                        <Row gutter={32}>

                            {!!accounts && accounts.map((val) => (

                                <Col span={24} key={val.id}>
                                    <Card
                                        bordered={true}
                                        style={{
                                            minWidth: 200,
                                            borderRadius: 16,
                                            marginBottom: 30,
                                            background: '#181818'
                                        }}
                                        loading={loading}
                                    >

                                        <Row justify='space-between' align='middle'>
                                            <Col>
                                                <Typography.Title level={5} style={{ margin: 0, padding: 0, marginBottom: 16 }}>{val.label}</Typography.Title>
                                            </Col>

                                            <Col>
                                                <Button onClick={() => showModal()} type="text" icon={<EditOutlined />} style={{ color: 'lightGrey' }} size={32} />
                                            </Col>
                                            <Input.Password
                                                value={val.isLock ? "000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000" : val.value}
                                                disabled={true}
                                                visibilityToggle={{ visible: !val.isLock }}
                                                iconRender={(visible) => (visible ? <Space><Button icon={<FileOutlined />} type="default" size="small" onClick={() => { navigator.clipboard.writeText(val.isLock ? AesEncrypt(val.value, "decrypt") : val.value) }}></Button><UnlockOutlined /></Space> : <Space><Button icon={<FileOutlined />} type="default" size="small" onClick={() => { navigator.clipboard.writeText(val.isLock ? AesEncrypt(val.value, "decrypt") : val.value) }}></Button><LockOutlined /></Space>)} />
                                            {/* /> */}
                                        </Row>
                                    </Card>

                                </Col>
                            ))}

                        </Row>

                    </Card>
                </Col>
            </Row >

        </div >
    );
}