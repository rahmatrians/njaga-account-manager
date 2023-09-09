import React from 'react';
import { RightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';

import { supabase } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';
import { storeItem } from '../../utils/storeItem';

const Login = () => {
    const navigate = useNavigate();
    const fillUserToken = storeItem((state) => state.fillUserToken);

    const onSubmit = async (values) => {
        await supabase.auth.signInWithPassword({
            email: values.username, //admin@gmail.com
            password: values.password, //123456
        })
            .then(res => {
                const accessToken = res.data.session.access_token;
                storeItem.setState({ userToken: accessToken });
                fillUserToken(accessToken);
                navigate('/dashboard');
            })
    };

    return (
        <Row>
            <Col span={4} style={{
                paddingTop: '20vh', margin: 'auto', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
            }}>
                <img src='../../public/icon.png' style={{ width: 45, display: 'block', marginLeft: 'auto', marginRight: 'auto', }} />
                <h3 style={{ textAlign: 'center' }}>Login Form</h3>

                <Form
                    name="normal_login"
                    onFinish={onSubmit}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item style={{ marginTop: '15%' }}>
                        <Button type="primary" icon={<RightOutlined />} htmlType="submit" style={{ width: '100%' }}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>

            </Col>
        </Row >
    );
};
export default Login;