import { useState } from "react";
import { Avatar, Button, Card, Col, FloatButton, Row, Switch, Typography } from "antd";
import { UserAddOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Link, useNavigate } from "react-router-dom";
import { storeItem } from '../../utils/storeItem';


export default function Platform() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fillMenuActive = storeItem((state) => state.fillMenuActive);

    const onChange = (checked) => {
        setLoading(!checked);
    };

    return (
        <div
            style={{
                padding: 24,
                minHeight: '50vh',
                borderRadius: 16,
            }}
        >

            <Switch checked={!loading} onChange={onChange} />
            <FloatButton
                onClick={() => navigate('/platform/add')}
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
            <Row gutter={32}>

                {([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8]).map((idx) => (

                    <Col flex={'auto'} key={idx}>
                        <Link to={`/platform/${idx}`}>
                            <Card
                                style={{
                                    minWidth: 200,
                                    borderRadius: 16,
                                    borderWidth: 0,
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
                                            Fa
                                        </Avatar>
                                        <div>
                                            <Title level={4} style={{ color: '#f56a00', margin: 0, padding: 0 }}>Facebook</Title>
                                            <p style={{ color: 'grey', margin: 0, padding: 0 }}>{("rxhmxtrxxns@proton.com").length > 20 ? ("rxhmxtrxxns@proton.com").slice(0, 17) + '...' : "rxhmxtrxxns@proton.com"}</p>
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