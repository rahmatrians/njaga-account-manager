import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, FloatButton, Row, Space, Typography } from "antd";
import { LeftOutlined, RightOutlined, EditOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from "react-router-dom";

import { firestore } from "../../config/firebase";
import { getDoc, doc, collection, getDocs, query, where, onSnapshot } from "firebase/firestore";


export default function CategoryDetail() {
    const navigate = useNavigate();
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({});
    const [platforms, setPlatforms] = useState([]);

    useEffect(() => {
        getCategory();
        getPlatforms();
    }, [])

    const items = [
        {
            key: '1',
            label: 'UserName',
            children: 'Zhou Maomao',
        },
        {
            key: '4',
            label: 'Address',
            span: 2,
            children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
        }
    ];

    const getCategory = async () => {
        setLoading(true);

        try {
            const docSnap = await getDoc(doc(firestore, "categories", id));

            if (docSnap.exists()) {
                setCategory(docSnap.data());
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.log("error get data");
        }

        setLoading(false);
    }

    const getPlatforms = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "platforms"));
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

            <Card
                bordered={false}
                style={{
                    minWidth: 320,
                    borderRadius: 16,
                    marginBottom: 30,
                    // background: '#181818',
                    backgroundImage: "linear-gradient(to right, #675bff, #cb83ff)"
                }}
                loading={loading}
            >

                <Row wrap={true} justify="space-between" align="middle">
                    <Col>
                        <Row wrap={true} align="middle">
                            <Space size={50}>
                                <Col>
                                    <Button type="text" icon={<LeftOutlined />} onClick={() => navigate(-1)}></Button>
                                </Col>
                                <Row wrap={true} align="middle">
                                    <Typography.Title level={1} style={{ margin: 0, marginRight: 20, padding: 0 }}>🚀</Typography.Title>
                                    <Typography.Title level={5} style={{ margin: 0, padding: 0, marginRight: 6 }}>{category.title}</Typography.Title>
                                    <Button type="text" icon={<EditOutlined />} onClick={() => console.log('edit')}></Button>
                                </Row>
                            </Space>
                        </Row>
                    </Col>
                    <Col>
                        <Row wrap={true} justify="space-between" align="middle">
                            <Space size={50}>
                                <Col style={{ maxWidth: 400 }}>
                                    <Typography.Paragraph style={{ opacity: 0.6, margin: 0, padding: 0 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incrunt mollit anim id est laborum...</Typography.Paragraph>
                                </Col>
                                <Col style={{ textAlign: 'center' }}>
                                    <Typography.Title level={1} style={{ margin: 0, padding: 0 }}>{9}</Typography.Title>
                                    <Typography.Text level={5} style={{ margin: 0, padding: 0 }}>Account</Typography.Text>
                                </Col>
                            </Space>
                        </Row>
                    </Col>
                </Row>

            </Card>

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
                                            <Typography.Title level={4} style={{ color: '#f56a00', margin: 0, padding: 0 }}>{val.name}</Typography.Title>
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