import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    Row,
    Space,
    message,
} from "antd";
import { useEffect, useState } from "react";
import { SyncOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { storeItem } from '../../utils/storeItem';

import { firestore } from "../../config/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { nanoID } from "../../utils/nanoID";


export default function CategoryAdd() {
    const { userId } = storeItem();
    const fillToastMessage = storeItem((state) => state.fillToastMessage);
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [provinceItems, setProvinceItems] = useState(null);

    const [loadings, setLoadings] = useState([]);

    useEffect(() => {

    }, [])

    const onFinish = async (values) => {
        setLoading(true);

        try {
            const setUID = nanoID();
            // Add a new document in collection "cities"
            // add using custom ID
            setDoc(doc(firestore, "categories", setUID), {

                // add using auto-generated ID
                // const setCategory = await addDoc(collection(firestore, "categories"), {
                id: setUID,
                title: values.title,
                description: values.description,
                icon: values.icon,
                total: 0,
                userId: userId,
            }).then(async (res) => {
                setLoading(false);
                fillToastMessage(['success', 'Submit success!']);
                navigate(-1);
            })
        } catch (error) {
            setLoading(false);
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
                background: '#181818',
                borderRadius: 16
            }}>
            {contextHolder}
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

                <Form.Item label="Title" name="title" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please input Title!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Title here..." size="large" />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[
                    {
                        required: true,
                        message: 'Please input Description!',
                    },
                ]} hasFeedback>
                    <Input.TextArea rows={4} placeholder="Type Description here..." size="large" />
                </Form.Item>

                <Form.Item label="Icon" name="icon" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: false,
                        message: 'Please input Icon!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Icon here..." size="large" />
                </Form.Item>

                {/* <Form.Item label="Avatar" name="province" rules={[
                    {
                        required: true,
                        message: 'Please input your Avatar!',
                    },
                ]} hasFeedback>
                    <Select onSelect={() => console.log('x')} onClick={() => getProvincies()} placeholder="Select Avatar here...">
                        {provinceItems ? (provinceItems) : (<Select.Option disabled>- No Data -</Select.Option>)}
                    </Select>
                </Form.Item> */}

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

        </Content>
    );
}