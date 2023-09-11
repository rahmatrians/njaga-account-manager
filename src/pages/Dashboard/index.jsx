import { useState } from "react";
import { Button, Card, Col, Row, Switch, Typography } from "antd";
import { RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Link } from "react-router-dom";
import { storeItem } from '../../utils/storeItem';


export default function Dashboard() {
    const [loading, setLoading] = useState(false);
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
            <Row gutter={32}>

                {([812, 8, 811, 4]).map((val) => (

                    <Col flex="auto" key={val}>
                        <Link to={'record/id'}>
                            <Card
                                style={{
                                    minWidth: 320,
                                    height: 180,
                                    borderRadius: 16,
                                    borderWidth: 0,
                                    marginBottom: 30
                                }}
                                loading={loading}
                            >
                                <Row justify='space-between' align='middle'>
                                    <Title level={1}>🚀</Title>
                                    <Title level={2} style={{ color: 'grey', fontWeight: 'bold', margin: 0, padding: 0 }}>89</Title>
                                </Row>

                                <Row justify='space-between' align='middle' style={{ marginTop: 10 }}>
                                    <Title level={4} style={{ margin: 0, padding: 0 }}>Social Media</Title>
                                    <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} />
                                </Row>
                            </Card>
                        </Link>
                    </Col>
                ))}

                <Col flex="auto">
                    <Link to={'/category'} onClick={() => fillMenuActive('2')}>
                        <Card
                            style={{
                                minWidth: 320,
                                height: 180,
                                borderRadius: 16,
                                borderWidth: 0,
                                marginBottom: 30
                            }}
                            loading={loading}
                        >

                            <Row justify='space-between' align='middle'>
                                <Title level={1}>👉🏻</Title>
                                {/* <Title level={2} style={{ color: 'grey', fontWeight: 'bold', margin: 0, padding: 0 }}>89</Title> */}
                            </Row>

                            <Row justify='space-between' align='middle' style={{ marginTop: 10 }}>
                                <Title level={4} style={{ margin: 0, padding: 0 }}>Others</Title>
                                <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} />
                            </Row>
                        </Card>
                    </Link>
                </Col>

            </Row>

            <div
                style={{
                    marginTop: 30,
                    padding: 24,
                    minHeight: '50vh',
                    background: 'white',
                    borderRadius: 16
                }}
            >

            </div>
        </div>
    );
}