import { useState } from 'react'
import '../../App.css'

import { Avatar, Badge, Button, ConfigProvider, Row, Space, theme } from 'antd';
import { LockOutlined, AppstoreOutlined, SettingOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { storeItem } from '../../utils/storeItem';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
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
        label: (<Link to={"/setting"}>{"Setting"}</Link>),
        key: "4",
        icon: <SettingOutlined />,
    },
];

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
    const { menuActive } = storeItem();
    const fillMenuActive = storeItem((state) => state.fillMenuActive);

    const { defaultAlgorithm, darkAlgorithm } = theme;
    const [isDarkMode, setIsDarkMode] = useState(true);

    const [collapsed, setCollapsed] = useState(false);

    const breadcumbItems = breadcumb;

    const { token: { colorBgContainer } } = theme.useToken();

    // console.log('warna : ', colorBgContainer);
    const handleClick = () => {
        setIsDarkMode((previousValue) => !previousValue);
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
                }}
            >

                {/* <Card style={{ width: "max-content" }}>
          <Button onClick={handleClick} type='primary'>
            {isDarkMode ? "Light" : "Dark"}
          </Button>
        </Card> */}

                <Layout
                    style={{
                        minHeight: '100vh',
                        background: 'black',
                    }}
                >
                    <Sider collapsed={collapsed} style={{ background: 'black', maxHeight: '100vh' }}>
                        <div className="demo-logo-vertical" />
                        <h1>nJaga</h1>
                        <Menu onClick={selected => fillMenuActive(selected.key)} selectedKeys={menuActive} mode="inline" items={items} style={{ background: 'black', borderWidth: 1, borderColor: '#1f1f1f', minHeight: '100vh' }} />
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
                                        <Button onClick={() => handleClick()} type='primary'>
                                            {isDarkMode ? "Y" : "X"}
                                        </Button>
                                        <Button onClick={() => (
                                            // handleClick(),
                                            setCollapsed(!collapsed)
                                        )} type='primary'>
                                            {isDarkMode ? "Light" : "Dark"}
                                        </Button>
                                        <Breadcrumb
                                            style={{
                                                margin: '16px 0',
                                            }}
                                            items={breadcumbItems}
                                        />
                                    </Space>
                                </Row>
                                <Row align="middle">
                                    <Space size="middle">
                                        <Badge count={9} size='small' offset={[-5, 5]}>
                                            <Avatar shape="cirlce" size="default" />
                                        </Badge>
                                        <Badge count={9} size='small' offset={[-5, 5]}>
                                            <Avatar shape="cirlce" size="default" />
                                        </Badge>
                                        <Badge count={9} size='small' offset={[-5, 5]}>
                                            <Avatar shape="cirlce" size="default" />
                                        </Badge>
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
        </div>
    )
}

export default Main
