import { useState } from "react";
import { Button, Card, Col, Row, Switch, Typography } from "antd";
import { RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Meta } = Card;
import { Link } from "react-router-dom";
import { storeItem } from '../../utils/storeItem';


export default function Category() {
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

                {([8, 8, 8, 8, 8, 8, 8, 8, 8]).map(() => (

                    <Col flex="auto">
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
                                {/* <WalletTwoTone style={{ fontSize: 40 }} twoToneColor="#eb2f96" /> */}
                                <Title level={1}>🚀</Title>

                                <Row justify='space-between' align='middle'>
                                    <Meta
                                        title={<Title level={2}>98</Title>}
                                        description={"This is the description"}
                                    />
                                    <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} />
                                </Row>
                            </Card>
                        </Link>
                    </Col>
                ))}

            </Row>
        </div>
    );
}