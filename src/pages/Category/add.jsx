import {
    Button,
    Cascader,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    InputNumber,
    Radio,
    Row,
    Select,
    Space,
    Switch,
    message,
    TreeSelect,
    Upload,
} from "antd";
import ImgCrop from 'antd-img-crop';
import { useEffect, useState } from "react";
import axios from 'axios';
import { InboxOutlined, SyncOutlined, LeftOutlined, SaveOutlined } from '@ant-design/icons';
import { createHashRouter, useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { Content } from "antd/es/layout/layout";
import { storeItem } from '../../utils/storeItem';

import { supabase } from "../../config/supabase";
import { firestore } from "../../config/firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import { nanoID } from "../../utils/nanoID";


export default function CategoryAdd() {
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

    const showMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
            className: 'custom-class',
            style: {
                marginTop: '5vh',
            },
        });
    };

    const onFinish = async (values) => {
        setLoading(true);

        try {
            // Add a new document in collection "cities"

            const setUID = nanoID();
            // add using custom ID
            setDoc(doc(firestore, "categories", setUID), {

                // add using auto-generated ID
                // const setCategory = await addDoc(collection(firestore, "categories"), {
                id: setUID,
                title: values.title,
                description: values.description,
                icon: values.icon
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
        showMessage('error', 'Submit failed!');
    };

    const createAccount = async (email, password) => {
        // try {
        //     return await supabase.auth.signUp({ email: email, password: password });
        // } catch (error) {
        //     console.log('got error : ', error);
        // }
    }

    const createUser = async (authId, values) => {
        // try {
        //     return await supabase
        //         .from('user')
        //         .insert({
        //             auth_id: authId,
        //             title: values.title,
        //             gender: values.gender,
        //             email: values.email,
        //             phone_number: values.prefix + values.phoneNumber,
        //             province: values.province,
        //             city: values.city.substr(2, 2),
        //             district: values.district.substr(4, 3),
        //             description: values.description,
        //             role_id: '729fa554-65ab-43c4-bece-9f038794193a', //owner role id
        //             active_status: values.activeStatus ? values.activeStatus : 0,
        //             last_signin: new Date().toLocaleDateString("id-ID"),
        //         })
        // } catch (error) {
        //     console.log('got error : ', error);
        // }
    }

    const createStore = async (values) => {
        try {
            const { data } = await supabase.from('user').select(`id`).eq('email', values.email).single();

            return await supabase
                .from('store')
                .insert({
                    user_id: data.id,
                    name: values.title,
                    description: values.description,
                    profile_pict: values.profilePicture[0].thumbUrl,
                    banner: values.banner[0].thumbUrl,
                    coor_latitude: values.coorLatitude,
                    coor_longitude: values.coorLongitude,
                    created_at: new Date().toLocaleDateString("id-ID"),
                })
        } catch (error) {
            console.log('error', error);
        }
    }


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
                    <Input placeholder="Type Title here..." />
                </Form.Item>

                <Form.Item label="Description" name="description" rules={[
                    {
                        required: true,
                        message: 'Please input Description!',
                    },
                ]} hasFeedback>
                    <Input.TextArea rows={4} placeholder="Type Description here..." />
                </Form.Item>

                <Form.Item label="Icon" name="icon" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: false,
                        message: 'Please input Icon!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Icon here..." />
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