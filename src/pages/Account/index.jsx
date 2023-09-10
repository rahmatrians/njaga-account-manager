import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, FloatButton, Row, Typography } from "antd";
import { UserAddOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Link, useNavigate } from "react-router-dom";
import { storeItem } from '../../utils/storeItem';

import { firestore } from "../../config/firebase";
import { collection, doc, getDocs, query, where, onSnapshot } from "firebase/firestore";



export default function Platform() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const fillMenuActive = storeItem((state) => state.fillMenuActive);

    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        getPlatforms();
    }, [])


    const getPlatforms = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "accounts"));
        onSnapshot(q, (querySnapshot) => {
            let tempPlatforms = [];
            querySnapshot.forEach((doc) => {
                tempPlatforms.push({ id: doc.id, ...doc.data() });
            });

            setPlatforms(tempPlatforms);
            setTimeout(() => setLoading(false), 500);
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
                                            {val.name.split(" ").length > 1 ? val.name.split(" ")[0][0].toUpperCase() + val.name.split(" ")[1][0].toUpperCase() : val.name.slice(0, 2).toUpperCase()}
                                        </Avatar>
                                        <div>
                                            <Title level={4} style={{ color: '#f56a00', margin: 0, padding: 0 }}>{val.name}</Title>
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