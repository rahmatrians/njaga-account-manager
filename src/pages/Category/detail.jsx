import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Divider, FloatButton, Form, Input, Modal, Row, Space, Typography } from "antd";
import { LeftOutlined, RightOutlined, EditOutlined, SaveOutlined, CloseOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from "react-router-dom";
import { storeItem } from "../../utils/storeItem";

import { firestore } from "../../config/firebase";
import { getDoc, doc, collection, getDocs, updateDoc, query, where, onSnapshot } from "firebase/firestore";


export default function CategoryDetail() {
    const navigate = useNavigate();
    let { id } = useParams();
    const fillToastMessage = storeItem((state) => state.fillToastMessage);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [platforms, setPlatforms] = useState([]);
    const [form] = Form.useForm();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);


    useEffect(() => {
        getCategory();
        getPlatforms();
    }, [])

    const getCategory = async () => {
        setLoading(true);

        try {
            // non-realtime query
            // const docSnap = await getDoc(doc(firestore, "categories", id));

            // realtime query
            const q = query(doc(firestore, "categories", id));
            onSnapshot(q, (querySnapshot) => {
                if (querySnapshot.exists()) {
                    setCategory(querySnapshot.data());
                } else {
                    console.log("No such document!");
                }
            });
        } catch (error) {
            console.log("error get data");
        }

        setLoading(false);
    }

    const getPlatforms = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "platforms"), where("categoryId", "==", id));
        onSnapshot(q, (querySnapshot) => {
            let tempPlatforms = [];
            querySnapshot.forEach((doc) => {
                tempPlatforms.push({ id: doc.id, ...doc.data() });
            });

            setPlatforms(tempPlatforms);
            setTimeout(() => setLoading(false), 500);
        });
    }

    const showModal = () => {
        setOpen(true);
    };


    const handleCancel = () => {
        setOpen(false);
    };

    const onFinish = async (values) => {
        setConfirmLoading(true);

        try {
            // Update a document in collection
            updateDoc(doc(firestore, "categories", category.id), {
                title: values.title,
                description: values.description,
                icon: values.icon,
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
                    <Form.Item style={{ marginTop: 50 }}>
                        <Space size={'small'}>
                            <Button
                                type="primary"
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

                    <Form.Item initialValue={category.title} label="Title" name="title" messageVariables={{ another: 'good' }} rules={[
                        {
                            required: true,
                            message: 'Please input Title!',
                        },
                    ]} hasFeedback>
                        <Input placeholder="Type Title here..." size="large" />
                    </Form.Item>

                    <Form.Item initialValue={category.description} label="Description" name="description" rules={[
                        {
                            required: true,
                            message: 'Please input Description!',
                        },
                    ]} hasFeedback>
                        <Input.TextArea rows={4} placeholder="Type Description here..." size="large" />
                    </Form.Item>

                    <Form.Item initialValue={category.icon} label="Icon" name="icon" messageVariables={{ another: 'good' }} rules={[
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
                    {/* <Form.Item label={'Action'} style={{ marginTop: 50 }}>
                        <Space size={'small'}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                icon={<SaveOutlined />}
                                loading={loading}
                            >
                                Save
                            </Button>
                            <Button icon={<SyncOutlined />} onClick={() => form.resetFields()}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item> */}
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

            <Card
                bordered={false}
                style={{
                    minWidth: 320,
                    borderRadius: 16,
                    marginBottom: 30,
                    // background: '#181818',
                    backgroundImage: "linear-gradient(to right, #675bff, #cb83ff)"
                }}
                loading={loading}
            >

                <Row wrap={true} justify="space-between" align="middle">
                    <Col>
                        <Row wrap={true} align="middle">
                            <Space size={50}>
                                <Col>
                                    <Button type="text" icon={<LeftOutlined />} onClick={() => navigate(-1)}></Button>
                                </Col>
                                <Row wrap={true} align="middle">
                                    <Typography.Title level={1} style={{ margin: 0, marginRight: 20, padding: 0 }}>{category.icon}</Typography.Title>
                                    <Typography.Title level={5} style={{ margin: 0, padding: 0, marginRight: 6 }}>{category.title}</Typography.Title>
                                    <Button type="text" icon={<EditOutlined />} onClick={() => showModal()}></Button>
                                </Row>
                            </Space>
                        </Row>
                    </Col>
                    <Col>
                        <Row wrap={true} justify="space-between" align="middle">
                            <Space size={50}>
                                <Col style={{ maxWidth: 400 }}>
                                    <Typography.Paragraph style={{ opacity: 0.6, margin: 0, padding: 0 }}>{category.description}</Typography.Paragraph>
                                </Col>
                                <Col style={{ textAlign: 'center' }}>
                                    <Typography.Title level={1} style={{ margin: 0, padding: 0 }}>{category.total}</Typography.Title>
                                    <Typography.Text level={5} style={{ margin: 0, padding: 0 }}>Account</Typography.Text>
                                </Col>
                            </Space>
                        </Row>
                    </Col>
                </Row>

            </Card>

            <Row gutter={32}>

                {!!platforms && platforms.map((val) => (

                    <Col flex={'auto'} key={val.id}>
                        <Link to={`/platform/${val.id}`}>
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
                                    <Row align='middle'>

                                        <Avatar
                                            shape="square"
                                            size={52}
                                            style={{
                                                backgroundColor: '#fde3cf',
                                                color: '#f56a00',
                                                marginRight: 20
                                            }}
                                        >
                                            {val.avatar}
                                        </Avatar>
                                        <div>
                                            <Typography.Title level={4} style={{ color: '#f56a00', margin: 0, padding: 0 }}>{val.name}</Typography.Title>
                                            <p style={{ color: 'grey', margin: 0, padding: 0 }}>{val.aliasName.length > 20 ? val.aliasName.slice(0, 17) + '...' : val.aliasName}</p>
                                        </div>
                                    </Row>

                                    <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} />
                                </Row>
                            </Card>
                        </Link>
                    </Col>
                ))}

            </Row>

        </div >
    );
}