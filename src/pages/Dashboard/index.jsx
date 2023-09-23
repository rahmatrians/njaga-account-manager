import { useEffect, useState } from "react";
import { Avatar, Button, Card, Col, List, Row, Skeleton, Switch, Typography } from "antd";
import { RightOutlined } from '@ant-design/icons';
const { Title } = Typography;
import { Link, useNavigate } from "react-router-dom";
import { storeItem } from '../../utils/storeItem';
import { collection, getCountFromServer, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { hexToRgb } from "../../utils/hexToRgb";
import moment from "moment";


export default function Dashboard() {
    const { userId } = storeItem();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [platforms, setPlatforms] = useState([]);
    const [totalPlatforms, setTotalPlatforms] = useState(0);

    const navigate = useNavigate();
    const fillMenuActive = storeItem((state) => state.fillMenuActive);

    useEffect(() => {
        getCategories();
        getPlatforms();
        getTotalPlatforms();
    }, [])


    const getCategories = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "categories"), orderBy("updatedAt", "desc"), where("userId", "==", userId), limit(5));
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


    const getPlatforms = async () => {
        setLoading(true);
        // realtime query
        const q = query(collection(firestore, "platforms"), orderBy("updatedAt", "desc"), where("userId", "==", userId), limit(5));
        onSnapshot(q, (querySnapshot) => {
            let tempPlatforms = [];
            querySnapshot.forEach((doc) => {
                tempPlatforms.push({ id: doc.id, ...doc.data() });
            });

            setPlatforms(tempPlatforms);
            setTimeout(() => setLoading(false), 500);
        });
    }


    const getTotalPlatforms = async () => {
        setLoading(true);

        const q = query(collection(firestore, "platforms"), where("userId", "==", userId));
        const snapshot = await getCountFromServer(q);
        setTotalPlatforms(snapshot.data().count);

        setTimeout(() => setLoading(false), 300);
    }


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

            <Row gutter={32}>
                <Col flex="auto">
                    <Link to={'/platform'}>
                        <Card
                            style={{
                                minWidth: 320,
                                borderRadius: 16,
                                borderWidth: 0,
                                marginBottom: 30,
                                backgroundImage: "linear-gradient(to right, #56CCF2,#2F80ED)",
                                boxShadow: "0 14px 50px -16px #2F80ED,0 -7px 50px -16px #2F80ED"
                            }}
                            loading={loading}
                        >
                            <Row justify='space-between' align='middle'>
                                <Title level={1} style={{ fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: 16, borderRadius: 14 }}>{totalPlatforms < 10 ? '0' + totalPlatforms : totalPlatforms}</Title>
                                {/* <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} /> */}
                            </Row>

                            <Title level={3} style={{ margin: 0, padding: 0 }}>Account Data</Title>
                            {/* <Row justify='space-between' align='middle' style={{ marginTop: 10 }}>
                            </Row> */}
                        </Card>
                    </Link>
                </Col>
                <Col flex="auto">
                    <Link to={`/password-lab`}>
                        <Card
                            style={{
                                minWidth: 320,
                                borderRadius: 16,
                                borderWidth: 0,
                                marginBottom: 30,
                                backgroundImage: "linear-gradient(to right, #e20b8c,#f75672)",
                                boxShadow: "0 14px 50px -16px #e20b8c,0 -7px 50px -16px #f75672"
                            }}
                            loading={loading}
                        >
                            <Row justify='space-between' align='middle'>
                                <Title level={1} style={{ fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: 16, borderRadius: 14 }}>89</Title>
                                {/* <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} /> */}
                            </Row>

                            <Title level={3} style={{ margin: 0, padding: 0 }}>Password Strength (not yet)</Title>
                            {/* <Row justify='space-between' align='middle' style={{ marginTop: 10 }}>
                            </Row> */}
                        </Card>
                    </Link>
                </Col>
                <Col flex="auto">
                    <Link to={'record/id'}>
                        <Card
                            style={{
                                minWidth: 320,
                                borderRadius: 16,
                                borderWidth: 0,
                                marginBottom: 30,
                                backgroundImage: "linear-gradient(to right, #fc67fa,#A770EF)",
                                boxShadow: "0 14px 50px -16px #A770EF,0 -7px 50px -16px #FDB99B"
                            }}
                            loading={loading}
                        >
                            <Row justify='space-between' align='middle'>
                                <Title level={1} style={{ fontWeight: 'bold', background: 'rgba(255,255,255,0.2)', padding: 16, borderRadius: 14 }}>89</Title>
                                {/* <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} /> */}
                            </Row>

                            <Title level={3} style={{ margin: 0, padding: 0 }}>Lorem Ipsum (not yet)</Title>
                            {/* <Row justify='space-between' align='middle' style={{ marginTop: 10 }}>
                            </Row> */}
                        </Card>
                    </Link>
                </Col>
            </Row>

            <Title level={3} style={{ fontWeight: 'bold', margin: '60px 0px 30px 0px' }}>Recently Updated</Title>
            <Title level={5} style={{ color: 'grey' }}>Categories</Title>

            {/* <Switch checked={!loading} onChange={onChange} /> */}
            <Row gutter={32}>

                {categories?.map((val) => (

                    <Col flex="auto" key={val.id}>
                        <Link to={`/category/${val.id}`}>
                            <Card
                                bordered={true}
                                style={{
                                    minWidth: 320,
                                    height: 180,
                                    borderRadius: 16,
                                    marginBottom: 30,
                                    background: '#0a0a0a'
                                }}
                                loading={loading}
                            >
                                <Row justify='space-between' align='middle'>
                                    <Title level={1}>{val.icon}</Title>
                                    <Title level={2} style={{ color: 'grey', fontWeight: 'bold', margin: 0, padding: 0 }}>{val.total}</Title>
                                </Row>

                                <Row justify='space-between' align='middle' style={{ marginTop: 10 }}>
                                    <Title level={4} style={{ margin: 0, padding: 0 }}>{val.title}</Title>
                                    <Button type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} />
                                </Row>
                            </Card>
                        </Link>
                    </Col>
                ))}

                <Col flex="auto">
                    <Link to={'/category'} onClick={() => fillMenuActive('2')}>
                        <Card
                            bordered={true}
                            style={{
                                minWidth: 320,
                                height: 180,
                                borderRadius: 16,
                                marginBottom: 30,
                                background: '#0a0a0a'
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
                    // background: 'white',
                    borderRadius: 16
                }}
            >

                <Title level={5} style={{ color: 'grey' }}>Platforms</Title>

                <List
                    className="demo-loadmore-list"
                    itemLayout="horizontal"
                    //   loading={initLoading}
                    //   loadMore={loadMore}
                    dataSource={platforms}
                    renderItem={(item) => (
                        <List.Item
                            onClick={() => navigate(`/platform/${item.id}`)}
                            key={item.id}
                            actions={[
                                // <a key="list-loadmore-edit">edit</a>,
                                <p key="updated-time">{moment(new Date(item.updatedAt), "YYYYMMDD").fromNow()}</p>,
                                <Button key="moreButton" type="text" shape="circle" icon={<RightOutlined />} style={{ color: 'lightGrey' }} size={32} />

                            ]}
                            style={{ cursor: 'pointer' }}
                        >
                            <Skeleton avatar title={false} loading={loading} active>
                                <List.Item.Meta
                                    avatar={<Avatar
                                        shape="square"
                                        size={48}
                                        style={{
                                            backgroundColor: item?.theme ? `rgba(${hexToRgb(item?.theme)},0.3)` : '#fde3cf',
                                            color: item?.theme ? item?.theme : '#f56a00',
                                        }}
                                    >
                                        {item?.avatar}
                                    </Avatar>}
                                    title={item?.name}
                                    description={item?.aliasName}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
                <center>
                    <Link to={`/platform`}>
                        <Button style={{ color: 'lightGrey', marginTop: 10 }} size={32}>Others</Button>
                    </Link>
                </center>

            </div>
        </div>
    );
}