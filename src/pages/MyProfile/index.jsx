import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, FloatButton, Row, Typography } from "antd";
import { InfoCircleOutlined, EditOutlined, UserOutlined, AppstoreAddOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Link, useNavigate } from "react-router-dom";

import { firestore } from "../../config/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { storeItem } from "../../utils/storeItem";
import moment from "moment";


export default function MyProfile() {
    const { userId, avatar, fullname, email, lastLogin } = storeItem();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const profileMenu = [
        {
            icon: <InfoCircleOutlined />,
            title: 'Personal Information',
            link: 'personal-info',
        },
        {
            icon: <UserOutlined />,
            title: 'Account',
            link: 'account',
        },
    ];

    useEffect(() => {
    }, [])



    return (
        <div
            style={{
                padding: 24,
                minHeight: '50vh',
                borderRadius: 16,
            }}
        >

            <Card
                style={{
                    // height: 250,
                    // overflow: 'hidden',
                    borderRadius: 16,
                    background: '#0a0a0a',
                    // backgroundImage: "linear-gradient(to right, #675bff,#cb83ff)",
                    // boxShadow: "0 14px 50px -16px #675bff,0 -7px 50px -16px #cb83ff",
                    justifyContent: 'end'
                }}
            >
                <Row align='middle' justify='space-between'>
                    <Col>
                        <Row align='middle'>
                            <Avatar
                                src={avatar}
                                size={120}
                                style={{ marginRight: 30 }}
                            />
                            <div>
                                <Row align='middle'>
                                    <Title level={2} style={{ fontWeight: 'bold', margin: '0 10px 4px 0', padding: 0 }}>{fullname}</Title>
                                    <Button type="text" icon={<EditOutlined />}></Button>
                                </Row>
                                <Typography.Paragraph style={{ opacity: 0.6, margin: 0, padding: 0 }}>{email}</Typography.Paragraph>
                            </div>
                        </Row>
                    </Col>
                    <Col>
                        <Typography.Paragraph style={{ textAlign: 'right', opacity: 0.6, margin: 0, padding: 0 }}>{"Last Login"}</Typography.Paragraph>
                        <Typography.Paragraph style={{ textAlign: 'right', margin: 0, padding: 0 }}>{moment(new Date(lastLogin), "YYYYMMDD").fromNow()}</Typography.Paragraph>
                    </Col>
                </Row>
            </Card >

            {/* <div style={{ marginTop: 50 }}>

                {!!profileMenu && profileMenu.map((val) => (

                    <Col flex="none" key={val.link}>
                        <Link to={`/my-profile/${val.link}`}>
                            <Card
                                bordered={false}
                                style={{
                                    minWidth: 320,
                                    borderRadius: 16,
                                    background: 'black'
                                }}
                                loading={loading}
                            >
                                <tr>
                                    <td>
                                        {val.icon}
                                    </td>
                                    <td>
                                        <Title level={5} style={{ margin: ' 0px 0px 0px 20px', padding: 0 }}>{val.title}</Title>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Title level={5} style={{ margin: ' 30px 0px 0px 20px', padding: 0 }}>Nama Lengkap</Title>
                                    </td>
                                    <td>
                                        <Title level={5} style={{ margin: '0px 0px 0px 20px', padding: 0 }}>{fullname}</Title>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>
                                        <Title level={5} style={{ margin: ' 10px 0px 0px 20px', padding: 0 }}>Nama Lengkap</Title>
                                    </td>
                                    <td>
                                        <Title level={5} style={{ margin: '0px 0px 0px 20px', padding: 0 }}>{fullname}</Title>
                                    </td>
                                </tr>

                            </Card>
                        </Link>
                    </Col>
                ))}

            </div> */}
        </div >
    );
}