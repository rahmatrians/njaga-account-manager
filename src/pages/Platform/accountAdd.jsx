import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, Divider, FloatButton, Form, Input, Modal, Row, Select, Space, Tag, Typography } from "antd";
import { LeftOutlined, UnlockOutlined, PlusOutlined, LockOutlined, EditOutlined, SaveOutlined, CloseOutlined, UserAddOutlined } from '@ant-design/icons';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { storeItem } from "../../utils/storeItem";

import { firestore } from "../../config/firebase";
import { getDoc, doc, collection, getDocs, updateDoc, query, where, onSnapshot, writeBatch } from "firebase/firestore";
import { AesEncrypt } from "../../utils/AesEncrypt";
import { nanoID } from "../../utils/nanoID";


export default function AccountAdd({ platformId, categoryId }) {
    const fillToastMessage = storeItem((state) => state.fillToastMessage);
    const fillAccountAddModal = storeItem((state) => state.fillAccountAddModal);
    const [form] = Form.useForm();

    const [open, setOpen] = useState(true);
    // const [isLock, setIsLock] = useState(data.isLock);
    const [confirmLoading, setConfirmLoading] = useState(false);


    useEffect(() => {
    }, [])

    const onLock = (isLock, key) => {
        let field = form.getFieldsValue("accounts");

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

    const handleCancel = () => {
        setOpen(false);
        fillAccountAddModal(false);
    };

    const onFinish = async (values) => {
        setConfirmLoading(true);

        try {
            const batch = writeBatch(firestore);

            values.accounts?.map(val => {
                const setAccountUID = nanoID();
                batch.set(doc(firestore, "accounts", setAccountUID), {
                    id: setAccountUID,
                    platformId: platformId,
                    categoryId: categoryId,
                    label: val.label,
                    value: val.isLock ? AesEncrypt(val.value, "encrypt") : val.value,
                    isLock: val.isLock,
                    valueStrength: 0,
                });
            })

            await batch.commit()
                .then(async (res) => {
                    setConfirmLoading(false);
                    setOpen(false);
                    fillToastMessage(['success', 'Submit success!']);
                })
        } catch (error) {
            setConfirmLoading(false);
            setOpen(false);
            console.error(error);
            fillToastMessage(['error', 'Submit failed!']);
        }

        fillAccountAddModal(false);
    }

    const onFinishFailed = () => {
        fillToastMessage(['error', 'Submit failed!']);
    };



    return (

        <Modal
            title={<Typography.Title level={3} style={{ margin: 0 }}>Add Account</Typography.Title>}
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
                                                        lockedStatus(key) ? { marginLeft: '5%', width: '95%' } : { marginLeft: '4%', width: '95%' }
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
            </Form>
        </Modal >
    );
}