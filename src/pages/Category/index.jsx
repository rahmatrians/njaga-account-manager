import { useEffect, useState } from "react";
import { Button, Card, Col, FloatButton, Row, Typography } from "antd";
import { AppstoreAddOutlined, RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Link, useNavigate } from "react-router-dom";

import { firestore } from "../../config/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { storeItem } from "../../utils/storeItem";


export default function Category() {
    const { userId } = storeItem();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])


    const getCategories = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "categories"), where("userId", "==", userId));
        onSnapshot(q, (querySnapshot) => {
            let tempCategories = [];
            querySnapshot.forEach((doc) => {
                tempCategories.push({ id: doc.id, ...doc.data() });
            });

            setCategories(tempCategories);
            setTimeout(() => setLoading(false), 500);
        });

        // non-realtime query
        // const categoriesQuery = await getDocs(collection(firestore, "categories"))
        // let tempCategories = [];
        // categoriesQuery.forEach(doc => {
        //     // doc.data() is never undefined for query doc snapshots
        //     tempCategories.push(doc.data());
        // });

        // setCategories(tempCategories);
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
                onClick={() => navigate('/category/add')}
                shape="circle"
                type="primary"
                style={{
                    right: 32,
                    bottom: 32,
                    width: 60,
                    height: 60,
                }}
                icon={<AppstoreAddOutlined style={{ width: 60, height: 60 }} />}
            />

            <Row gutter={32}>

                {!!categories && categories.map((val) => (

                    <Col flex="auto" key={val.id}>
                        <Link to={`/category/${val.id}`}>
                            <Card
                                bordered={true}
                                style={{
                                    minWidth: 320,
                                    borderRadius: 16,
                                    marginBottom: 30,
                                    background: '#181818'
                                }}
                                loading={loading}
                            >
                                <Row justify='space-between' align='middle'>
                                    <Title level={1}>{val.icon}</Title>
                                    <Title level={2} style={{ color: 'grey', fontWeight: 'bold', margin: 0, padding: 0, marginRight: 8 }}>{val.total}</Title>
                                </Row>

                                <Row justify='space-between' align='middle' style={{ marginTop: 10 }}>
                                    <Title level={4} style={{ margin: 0, padding: 0 }}>{val.title}</Title>
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