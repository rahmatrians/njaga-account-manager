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

import { supabase } from "../../config/supabase";
import { firestore } from "../../config/firebase";
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";



export default function PlatformAdd() {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const [categories, setCategories] = useState([]);
    const [provinceItems, setProvinceItems] = useState(null);
    const [regencyItems, setRegencyItems] = useState(null);
    const [districtItems, setDistrictItems] = useState(null);

    const [isCityDisabled, setIsCityDisabled] = useState(true);
    const [isDistrictDisabled, setIsDistrictDisabled] = useState(true);

    const [loadings, setLoadings] = useState([]);

    useEffect(() => {
        getCategories();
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

    const normFile = (e) => {
        // console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="+62">+62</Option>
                <Option value="+87">+87</Option>
            </Select>
        </Form.Item>
    );

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const onSearch = (value) => {
        // console.log('search:', value);
    };

    const onChange = (value) => {
        // console.log(`selected ${value}`);
    };

    const getCategories = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "categories"));
        onSnapshot(q, (querySnapshot) => {
            let tempCategories = [];
            querySnapshot.forEach((doc) => {
                tempCategories.push({ value: doc.id, label: doc.data().title });
            });

            setCategories(tempCategories);
            setTimeout(() => setLoading(false), 500);
        });
    }

    const getProvincies = async () => {
        try {
            const response = await axios.get('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
            setProvinceItems(response.data.map((val) => (
                <Select.Option value={val.id} key={val.id}>{val.name}</Select.Option>
            )))
        } catch (error) {
            console.error(error);
        }
    }

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

        createAccount(values.email, values.password)
            .then(res => {
                createUser(res.data.user.id, values)
                    .then(() => {
                        createStore(values).then(() => {
                            setLoading(false);
                            showMessage('success', 'Submit success!');
                            //     Promise.all([
                            //         setTimeout(() => {
                            //             setLoading(false);
                            //             showMessage('success', 'Submit success!');
                            //         }, 2000)
                            //     ]).then(() => navigate(-1))
                        })
                    })
            })
            .catch(error => {
                setLoading(false);
                showMessage('error', 'Submit failed!');
            });
    };

    const onFinishFailed = () => {
        showMessage('error', 'Submit failed!');
    };

    const createAccount = async (email, password) => {
        try {
            return await supabase.auth.signUp({ email: email, password: password });
        } catch (error) {
            console.log('got error : ', error);
        }
    }

    const createUser = async (authId, values) => {
        try {
            return await supabase
                .from('user')
                .insert({
                    auth_id: authId,
                    fullname: values.fullname,
                    gender: values.gender,
                    email: values.email,
                    phone_number: values.prefix + values.phoneNumber,
                    province: values.province,
                    city: values.city.substr(2, 2),
                    district: values.district.substr(4, 3),
                    address: values.address,
                    role_id: '729fa554-65ab-43c4-bece-9f038794193a', //owner role id
                    active_status: values.activeStatus ? values.activeStatus : 0,
                    last_signin: new Date().toLocaleDateString("id-ID"),
                })
        } catch (error) {
            console.log('got error : ', error);
        }
    }

    const createStore = async (values) => {
        try {
            const { data } = await supabase.from('user').select(`id`).eq('email', values.email).single();

            return await supabase
                .from('store')
                .insert({
                    user_id: data.id,
                    name: values.fullname,
                    address: values.address,
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
                <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}>Owner Profile</Divider>
                <Form.Item label="Category" name="category" messageVariables={{ another: 'good' }} rules={[
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
                    />
                </Form.Item>
                <Form.Item label="Name" name="Name" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please input Name!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Name here..." />
                </Form.Item>
                <Form.Item label="Alias Name" name="Alias Name" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please input Alias Name!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Alias Name here..." />
                </Form.Item>
                <Form.Item label="Gender" name="gender" rules={[
                    {
                        required: true,
                        message: 'Please input your Gender!',
                    },
                ]} hasFeedback>
                    <Select placeholder="Select Gender here...">
                        <Select.Option value={1} key={1}>Man</Select.Option>
                        <Select.Option value={2} key={2}>Woman</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                    hasFeedback
                >
                    <Input type="number" addonBefore={prefixSelector} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[
                    {
                        required: true,
                        type: 'email',
                        message: 'Please input your Email!',
                    },
                ]}
                    hasFeedback>
                    <Input placeholder="Type Email here..." />
                </Form.Item>
                <Form.Item label="Password" name="password" rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                ]} hasFeedback>
                    <Input.Password placeholder="Type Password here..." />
                </Form.Item>
                <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}>Store Profile</Divider>
                <Form.Item label="Store Name" name="storename" rules={[
                    {
                        required: true,
                        message: 'Please input your Store Name!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Store Name here..." />
                </Form.Item>
                <Form.Item name="profilePicture" label="Profile Picture" valuePropName="fileList" getValueFromEvent={normFile}>
                    {/* <ImgCrop cropShape="round" modalTitle="Crop Image" rotationSlider> */}
                    <Upload maxCount={1} accept=".png,.jpg,.jpeg" listType="picture-card">
                        <div>
                            <InboxOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Click here
                            </div>
                        </div>
                    </Upload>
                    {/* </ImgCrop> */}
                </Form.Item>
                <Form.Item label="Banner">
                    <Form.Item name="banner" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                        <Upload.Dragger maxCount={1} accept=".png,.jpg,.jpeg" listType="picture-card" name="files" hasFeedback>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Province" name="province" rules={[
                    {
                        required: true,
                        message: 'Please input your Province!',
                    },
                ]} hasFeedback>
                    <Select onSelect={() => (setRegencyItems(null), form.setFieldValue('city', null), form.setFieldValue('district', null))} onClick={() => getProvincies()} placeholder="Select Province here...">
                        {provinceItems ? (provinceItems) : (<Select.Option disabled>- No Data -</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item label="Address" name="address" rules={[
                    {
                        required: true,
                        message: 'Please input your Address!',
                    },
                ]} hasFeedback>
                    <Input.TextArea rows={4} placeholder="Type Address here..." />
                </Form.Item>
                <Form.Item label="Latitude" name="coorLatitude" rules={[
                    {
                        required: true,
                        message: 'Please input your Coordinate Latitude!',
                    },
                ]} hasFeedback>
                    <InputNumber type="number" style={{ minWidth: '100%' }} placeholder="Type Latitude Coordinate here..." />

                </Form.Item>
                <Form.Item label="Longitude" name="coorLongitude" rules={[
                    {
                        required: true,
                        message: 'Please input your Coordinate Longitude!',
                    },
                ]} hasFeedback>
                    <InputNumber type="number" style={{ minWidth: '100%' }} placeholder="Type Longitude Coordinate here..." />
                </Form.Item>
                <Form.Item label="Status Aktif" name="activeStatus" valuePropName="checked">
                    <Switch />
                </Form.Item>
                {/* <Form.Item label="TreeSelect">
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