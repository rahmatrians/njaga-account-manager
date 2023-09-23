import { useEffect, useState } from 'react'
import '../../App.css'

import { Avatar, Button, ConfigProvider, Row, Space, theme, message, Popover, Typography, Badge } from 'antd';
import { LeftOutlined, MenuFoldOutlined, MenuUnfoldOutlined, ExperimentOutlined, LogoutOutlined, LockOutlined, AppstoreOutlined, SettingOutlined, UserOutlined, PieChartOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { storeItem } from '../../utils/storeItem';
import { UserAuth } from '../../context/AuthContext';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}

// const breadcumbItems = [
//     {
//         path: 'index',
//         title: 'home',
//     },
//     {
//         path: 'indexx',
//         title: 'you',
//     },
// ]


function Main({ children, breadcumb }) {
    const { fullname, menuActive, avatar, toastMessage } = storeItem();
    const fillMenuActive = storeItem((state) => state.fillMenuActive);
    const fillToastMessage = storeItem((state) => state.fillToastMessage);
    const [messageApi, contextHolder] = message.useMessage();

    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(true);

    const [collapsed, setCollapsed] = useState(false);

    const breadcumbItems = breadcumb;

    const { token: { colorBgContainer } } = theme.useToken();
    const { logOut } = UserAuth();

    const items = [
        {
            label: (<Link to={"/dashboard"}>{"Dashboard"}</Link>),
            key: '1',
            icon: <PieChartOutlined />,
        },
        {
            label: (<Link to={"/category"}>{"Category"}</Link>),
            key: '2',
            icon: <AppstoreOutlined />,
        },
        {
            label: (<Link to={"/platform"}>{"Platform"}</Link>),
            key: '3',
            icon: <LockOutlined />,
        },
        {
            label: (<Link to={"/password-lab"}>{"Password Lab"}</Link>),
            key: "4",
            icon: <Badge dot><ExperimentOutlined /></Badge>,
        },
        {
            label: (<Link to={"/setting"}>{"Setting"}</Link>),
            key: "5",
            icon: <SettingOutlined />,
        },
    ];

    useEffect(() => {
    }, [])

    const handleClick = () => {
        setIsDarkMode((previousValue) => !previousValue);
    };

    const showMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
            className: 'custom-class',
            style: {
                marginTop: '5vh',
            },
        });
    };



    return (
        <div style={{
            height: '100vh', width: '100%', background: 'orange', position: 'fixed',
        }}>
            <ConfigProvider
                theme={{
                    // algorithm: darkAlgorithm,
                    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                    token: {
                        colorPrimaryBg: 'dark',
                        colorBgBase: 'dark',
                        // colorBgContainer: isDarkMode ? darkAlgorithm : defaultAlgorithm,
                        colorPrimary: '#0057ff',
                    },
                    components: {
                        Menu: {
                            itemSelectedBg: '#0057ff',
                            itemSelectedColor: 'white'
                        },
                    }
                }}

            >

                <Layout
                    style={{
                        minHeight: '100vh',
                        background: 'black',
                    }}
                >

                    {!!toastMessage && (showMessage(toastMessage[0], toastMessage[1]), fillToastMessage(null))}
                    {contextHolder}

                    <Sider collapsed={collapsed} style={{ background: 'black', maxHeight: '100vh' }}>
                        <div className="demo-logo-vertical" />
                        <h1>nJaga</h1>
                        <Menu onClick={selected => fillMenuActive(selected.key)} selectedKeys={menuActive} mode="inline" items={items} style={{ background: '#0a0a0a', borderWidth: 1, borderColor: '#1f1f1f', minHeight: '100vh', paddingLeft: 10, paddingRight: 10 }} />
                        {!collapsed && (

                            <Link to={'https://www.github.com/rahmatrians'} target="_blank" rel='noopener noreferrer'>
                                <p style={{ position: 'absolute', left: 30, bottom: 20, color: 'grey', fontSize: 12 }}>Developed by <br /> Rahmat Riansyah</p>
                            </Link>
                        )}
                    </Sider>
                    <Layout style={{
                        background: 'black',
                        borderRadius: 50,
                        // overflow: 'hidden'
                    }}>
                        <Header

                            style={{
                                background: 'black',
                            }}
                        >
                            <Row align="middle" justify="space-between">
                                <Row align="middle">
                                    <Space size="middle">
                                        {/* <Button onClick={() => handleClick()} type='primary'>
                                            {isDarkMode ? "Light" : "Dark"}
                                        </Button> */}
                                        <Button
                                            onClick={() => (
                                                // handleClick(),
                                                setCollapsed(!collapsed)
                                            )}
                                            icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
                                            // type='primary'
                                            style={{ padding: 5 }}
                                        />
                                        <Breadcrumb
                                            style={{
                                                margin: '16px 0',
                                            }}
                                            items={breadcumbItems}
                                        />
                                    </Space>
                                </Row>
                                <Row align="middle">
                                    <Space align="center" size="middle">
                                        {/* <Badge count={2} size='small' offset={[-5, 5]}>
                                            <Avatar shape="cirlce" size="default" />
                                        </Badge>
                                        <Popover placement="bottomRight" title={"text"} content={"content"} trigger="click">
                                            <Badge count={13} size='small' offset={[-5, 5]}>
                                                <Button icon={<BellOutlined />}></Button>
                                            </Badge>
                                        </Popover> */}
                                        <Popover
                                            content={
                                                <Space direction="vertical" style={{}}>
                                                    <Button icon={<UserOutlined />} type='text' style={{ width: '100%', textAlign: 'left' }}>My Profile</Button>
                                                    <Button onClick={() => logOut()} icon={<LogoutOutlined />} type='text' danger style={{ width: '100%', textAlign: 'left' }}>Logout</Button>
                                                </Space>
                                            }
                                            placement="bottomRight" trigger="click">
                                            <a>
                                                <Row align="middle">
                                                    <Space size="middle">
                                                        <Typography.Title level={5} style={{ margin: 0, padding: 0 }}>{fullname}</Typography.Title>
                                                        <Avatar src={avatar} shape="cirlce" size="large" />
                                                    </Space>
                                                </Row>
                                            </a>
                                        </Popover>
                                    </Space>
                                </Row>
                            </Row>
                        </Header>

                        <Content
                            style={{
                                padding: '50px 50px 120px 50px',
                                borderTopLeftRadius: 30,
                                background: 'black  ',
                                maxHeight: '100vh',
                                overflowY: 'scroll'
                            }}
                        >
                            {/* <Breadcrumb
                                style={{
                                    margin: '16px 0',
                                }}
                                items={breadcumbItems}
                            /> */}


                            <main>{children}</main>


                            {/* <Footer
                                style={{
                                    textAlign: 'center',
                                }}
                            >
                                <Link to={'https://www.github.com/rahmatrians'} target="_blank" rel='noopener noreferrer'>
                                    <p style={{ position: 'absolute', bottom: 20, color: 'lightGrey', fontSize: 12 }}>Developed by Rahmat Riansyah</p>
                                </Link>
                            </Footer> */}

                        </Content>
                    </Layout>
                </Layout>

            </ConfigProvider>
        </div >
    )
}

export default Main
