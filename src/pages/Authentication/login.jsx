import React, { useEffect, useState } from 'react';
import { RightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row } from 'antd';

import { supabase } from '../../config/supabase';
import { useNavigate } from 'react-router-dom';
import { storeItem } from '../../utils/storeItem';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { firestore } from '../../config/firebase';
import { nanoID } from '../../utils/nanoID';
import { UserAuth } from '../../context/AuthContext';

const Login = () => {
    const { googleSignIn, user } = UserAuth();

    const navigate = useNavigate();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const [loading, setLoading] = useState(false);
    const [enable, setEnable] = useState(false);
    const fillUserToken = storeItem((state) => state.fillUserToken);
    const fillToastMessage = storeItem((state) => state.fillToastMessage);


    useEffect(() => {
        // authVerification();
        // console.log('login user: ', user);
        if (user) {
            navigate("/dashboard");
        }
    }, [user]);

    const authVerification = () => {
        const isVerified = !user ? 1 : 0;
        return isVerified;

        //     // const { userToken } = storeItem();
        //     // // console.log('user token : ', userToken);
        //     // const isVerified = userToken ? 1 : 0;
        //     // return isVerified;
    }

    const handleGoogleSignIn = async () => {
        try {
            googleSignIn();
        } catch (error) {
            console.log("failed to login", error);
        }
    };

    const onSignGoogle = async (values) => {
        setLoading(true);

        signInWithPopup(auth, provider)
            .then(async (result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;

                console.log("result", result);
                console.log("user", user);
                console.log("token", token);

                try {
                    const usersData = await getDocs(query(collection(firestore, "users"), where("authId", "==", user.uid)));

                    if (usersData.empty) {
                        const setUID = nanoID();
                        setDoc(doc(firestore, "users", setUID), {
                            // add using auto-generated ID
                            // const setCategory = await addDoc(collection(firestore, "categories"), {
                            id: setUID,
                            authId: user.uid,
                            fullname: user.displayName,
                            avatar: user.photoURL,
                            lastLoginAt: user.metadata.lastLoginAt,
                            createdAt: user.metadata.createdAt,
                            providerId: result.providerId,
                        })
                    }

                    setLoading(false);
                    const accessToken = token;
                    fillUserToken(accessToken);
                    fillToastMessage(['success', 'Submit success!']);
                    navigate("/dashboard");
                } catch (err) {
                    throw new Error(err);
                }
            }).catch((error) => {
                setLoading(false);
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                // const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log("errorCode", errorCode);
                console.log("errorMessage", errorMessage);
                // console.log("email", email);
                console.log("credential", credential);

                fillToastMessage(['success', errorMessage]);
            });

    }

    const onSubmit = async (values) => {
        await supabase.auth.signInWithPassword({
            email: values.username, //admin@gmail.com
            password: values.password, //123456
        })
            .then(res => {
                const accessToken = res.data.session.access_token;
                // storeItem.setState({ userToken: accessToken });
                fillUserToken(accessToken);
                navigate('/dashboard');
            })
    };

    return authVerification() ? (
        <Row>
            <Col span={4} style={{
                paddingTop: '20vh', margin: 'auto', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
            }}>
                <img src='../../public/icon.png' style={{ width: 45, display: 'block', marginLeft: 'auto', marginRight: 'auto', }} />
                <h3 style={{ textAlign: 'center' }}>Login Form</h3>

                {/* <Form
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
                </Form> */}

                <Form.Item style={{ marginTop: '15%' }}>
                    {/* <Button onClick={() => onSignGoogle()} type="primary" icon={<RightOutlined />} style={{ width: '100%' }}> */}
                    <Button onClick={() => handleGoogleSignIn()} type="primary" icon={<RightOutlined />} style={{ width: '100%' }}>
                        Google
                    </Button>
                </Form.Item>

            </Col>
        </Row >
    ) : navigate("/dashboard");
};
export default Login;