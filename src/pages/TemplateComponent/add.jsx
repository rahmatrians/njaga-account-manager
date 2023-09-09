import {
    Button,
    Cascader,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Space,
    Switch,
    TreeSelect,
} from "antd";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { EditOutlined, SyncOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";


export default function Add() {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 3000);
    };

    useEffect(() => {
        // getStore();
    }, [])

    // const getStore = async () => {
    //     setLoading(true);
    //     const { data, error } = await supabase.from('store').select(`id, name, address, user (fullname, email)`);

    //     let newData = data.map((val, idx) => {
    //         return { number: idx + 1, id: val.id, fullname: val.user.fullname, email: val.user.email, name: val.name, address: val.address }
    //     });

    //     setStore(newData);
    //     setLoading(false);
    // }


    return (

        <Content
            style={{
                padding: 24,
                minHeight: '50vh',
                background: 'white',
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
                // onValuesChange={ }
                size={'default'}
            // style={{
            //     maxWidth: 600,
            // }}
            >
                <Form.Item label="Store Name" name="storename" rules={[
                    {
                        required: true,
                        message: 'Please input your Store Name!',
                    },
                ]}>
                    <Input placeholder="Type Store Name here..." />
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[
                    {
                        required: true,
                        message: 'Please input your Address!',
                    },
                ]}>
                    <Input placeholder="Type Address here..." />
                </Form.Item>
                <Form.Item label="Full Name" name="fullname" rules={[
                    {
                        required: true,
                        message: 'Please input your Full Name!',
                    },
                ]}>
                    <Input placeholder="Type Full Name here..." />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[
                    {
                        required: true,
                        message: 'Please input your Email!',
                    },
                ]}>
                    <Input placeholder="Type Email here..." />
                </Form.Item>
                <Form.Item label="Select">
                    <Select placeholder="Select Demo here...">
                        <Select.Option value="demo">Demo</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="TreeSelect">
                    <TreeSelect
                        treeData={[
                            {
                                title: 'Light',
                                value: 'light',
                                children: [
                                    {
                                        title: 'Bamboo',
                                        value: 'bamboo',
                                    },
                                ],
                            },
                        ]}
                        placeholder="Type Tree Data here..."
                    />
                </Form.Item>
                <Form.Item label="Cascader">
                    <Cascader
                        options={[
                            {
                                value: 'zhejiang',
                                label: 'Zhejiang',
                                children: [
                                    {
                                        value: 'hangzhou',
                                        label: 'Hangzhou',
                                    },
                                ],
                            },
                        ]}
                        placeholder="Type Cascader here..."
                    />
                </Form.Item>
                <Form.Item label="DatePicker">
                    <DatePicker placeholder="Pick Date..." />
                </Form.Item>
                <Form.Item label="InputNumber">
                    <InputNumber placeholder="Type Numebr here..." />
                </Form.Item>
                <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item>
                <Form.Item>
                    <Space size={'small'}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            icon={<SaveOutlined />}
                            loading={loadings[1]}
                            onClick={() => enterLoading(1)}
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