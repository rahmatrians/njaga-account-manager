import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, FloatButton, Row, Typography } from "antd";
import { UserAddOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Link, useNavigate } from "react-router-dom";
import { storeItem } from '../../utils/storeItem';

import { firestore } from "../../config/firebase";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { hexToRgb } from "../../utils/hexToRgb";



export default function Platform() {
    const { userId } = storeItem();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        getPlatforms();
    }, [])


    const getPlatforms = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "platforms"), orderBy("updatedAt", "desc"), where("userId", "==", userId));
        onSnapshot(q, (querySnapshot) => {
            let tempPlatforms = [];
            querySnapshot.forEach((doc) => {
                tempPlatforms.push({ id: doc.id, ...doc.data() });
            });

            setPlatforms(tempPlatforms);
            setTimeout(() => setLoading(false), 0);
        });
    }


    return (
        <div
            style={{
                padding: 24,
                minHeight: '50vh',
                borderRadius: 16,
            }}
        >

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

                {!!platforms && platforms.map((val) => (

                    <Col flex={'auto'} key={val.id}>
                        <Link to={`/platform/${val.id}`}>
                            <Card
                                bordered={true}
                                style={{
                                    minWidth: 200,
                                    borderRadius: 16,
                                    marginBottom: 30,
                                    background: '#0a0a0a'
                                }}
                                loading={loading}
                            >

                                <Row justify='space-between' align='middle'>
                                    <Row align='middle'>

                                        <Avatar
                                            shape="square"
                                            size={52}
                                            style={{
                                                backgroundColor: val.theme ? `rgba(${hexToRgb(val.theme)},0.3)` : '#fde3cf',
                                                color: val.theme ? val.theme : '#f56a00',
                                                marginRight: 20
                                            }}
                                        >
                                            {val.avatar}
                                        </Avatar>
                                        <div>
                                            <Title level={4} style={{ color: val.theme ? val.theme : '#f56a00', margin: 0, padding: 0 }}>{val.name}</Title>
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