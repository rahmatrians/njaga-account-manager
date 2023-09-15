import { useEffect, useState } from "react";
import { Button, Col, Divider, Form, Input, Modal, Popconfirm, Row, Space, Typography } from "antd";
import { UnlockOutlined, LockOutlined, SaveOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { storeItem } from "../../utils/storeItem";

import { firestore } from "../../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AesEncrypt } from "../../utils/AesEncrypt";


export default function AccountUpdate({ data }) {
    const fillToastMessage = storeItem((state) => state.fillToastMessage);
    const fillAccountUpdateModal = storeItem((state) => state.fillAccountUpdateModal);
    const [form] = Form.useForm();

    const [open, setOpen] = useState(true);
    const [isLock, setIsLock] = useState(data.isLock);
    const [confirmLoading, setConfirmLoading] = useState(false);


    useEffect(() => {
    }, [])

    const onLock = (isLock) => {
        let field = form.getFieldsValue();

        // if (field && Array.isArray(field) && field.length) {
        //     if (field[key]?.value) {
        field.isLock = isLock;
        form.setFieldsValue(field);
        // }
        // }
    };

    const lockedStatus = () => {
        // console.log('lockedstatus', form.getFieldsValue()?.isLock);
        return form.getFieldsValue()?.isLock;
    };

    const handleCancel = () => {
        setOpen(false);
        fillAccountUpdateModal(false);
    };

    const confirm = (e) => {
        try {
            // Delete a document in collection
            deleteDoc(doc(firestore, "accounts", data.id)).then(async (res) => {
                setConfirmLoading(false);
                setOpen(false);
                fillToastMessage(['success', 'Submit success!']);
            })
        } catch (error) {
            setConfirmLoading(false);
            setOpen(false);
            fillToastMessage(['error', 'Submit failed!']);
        }
        fillAccountUpdateModal(false);
    };

    const cancel = (e) => {
    };

    const onFinish = async (values) => {
        setConfirmLoading(true);

        try {
            // Update a document in collection
            updateDoc(doc(firestore, "accounts", data.id), {
                label: values.label,
                value: isLock ? AesEncrypt(values.value, "encrypt") : values.value,
                isLock: isLock,
                // valueStrength: 0,
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
        fillAccountUpdateModal(false);
    }

    const onFinishFailed = () => {
        fillToastMessage(['error', 'Submit failed!']);
    };



    return (

        <Modal
            title={<Typography.Title level={3} style={{ margin: 0 }}>Update Account</Typography.Title>}
            open={open}
            onCancel={handleCancel}
            maskClosable={false}
            width={800}
            footer={
                <Form.Item>
                    <Row justify="space-between">
                        <Popconfirm
                            title="Confirm"
                            description="Are you sure to delete this account?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button danger icon={<DeleteOutlined />}>
                                Remove
                            </Button>
                        </Popconfirm>
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
                    </Row>
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
                <Form.Item initialValue={data.label} label="Label" name="label" messageVariables={{ another: 'good' }} rules={[
                    {
                        required: true,
                        message: 'Please input Label!',
                    },
                ]} hasFeedback>
                    <Input placeholder="Type Label here..." size="large" />
                </Form.Item>

                <Row>
                    <Col flex={'auto'} style={{ marginRight: 8 }}>
                        <Form.Item initialValue={isLock ? AesEncrypt(data.value, "decrypt") : data.value} label="Value" name="value" messageVariables={{ another: 'good' }} rules={[
                            {
                                required: true,
                                message: 'Please input Value',
                            },
                        ]} hasFeedback>
                            <Input.Password
                                style={
                                    isLock ? { marginLeft: '5%', width: '95%' } : { marginLeft: '4%', width: '95%' }
                                }
                                visibilityToggle={{ visible: !isLock }}
                                iconRender={(visible) => (visible ? <UnlockOutlined /> : <LockOutlined />)}
                                placeholder="Type Value here..." size="large" />
                        </Form.Item >
                    </Col>

                    <Col>
                        <Form.Item initialValue={data.isLock} name="isLock">
                            <Button onClick={() => setIsLock(!isLock)} icon={!isLock ? <LockOutlined /> : <UnlockOutlined />} size="large" type="primary" >{isLock ? "Unencrpyt" : "Encrypt"}</Button>
                        </Form.Item >
                    </Col>
                </Row>

                <Divider orientation="left" dashed plain style={{ color: 'lightGrey' }}></Divider>
            </Form>
        </Modal >
    );
}