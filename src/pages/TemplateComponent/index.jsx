import { Button, Pagination, Popconfirm, Space, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { supabase } from "../../config/supabase";
import { EditOutlined, DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from "react-router-dom";


export default function Partners() {
    const [store, setStore] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getStore();
    }, [])

    const getStore = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('store').select(`id, name, address, user (fullname, email)`);

        let newData = data.map((val, idx) => {
            return { number: idx + 1, id: val.id, fullname: val.user.fullname, email: val.user.email, name: val.name, address: val.address }
        });

        setStore(newData);
        setLoading(false);
    }

    const confirm = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(null), 0);
        });

    //table
    const columns = [
        {
            title: 'No.',
            dataIndex: 'number',
            key: 'number',
            // sorter: (a, b) => a.number - b.number,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b><p>{text}</p></b>,
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            // key: 'address',
            render: (text) => <p>{text.slice(0, 40) + '...'}</p>,
        },
        // {
        //     title: 'Tags',
        //     key: 'tags',
        //     dataIndex: 'tags',
        //     render: (_, { tags }) => (
        //         <>
        //             {tags.map((tag) => {
        //                 let color = tag.length > 5 ? 'geekblue' : 'green';
        //                 if (tag === 'loser') {
        //                     color = 'volcano';
        //                 }
        //                 return (
        //                     <Tag color={color} key={tag}>
        //                         {tag.toUpperCase()}
        //                     </Tag>
        //                 );
        //             })}
        //         </>
        //     ),
        // },
        {
            title: 'Action',
            dataIndex: 'id',
            key: 'id',
            render: (_, record) => (
                <Space size="middle">
                    {/* <a>Invite {record.name}</a> */}
                    <Link to={record.id} style={{ padding: 20 }}><EditOutlined style={{ color: '#ffa500' }} /></Link>
                    {/* <a style={{ padding: 20 }}><EditOutlined style={{ color: '#ffa500' }} /></a> */}
                    <Popconfirm
                        title="Confirm"
                        description="Are you sure?"
                        onConfirm={confirm}
                        onOpenChange={() => console.log('open change')}
                        icon={
                            <QuestionCircleOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    >
                        <a style={{ padding: 20 }}><DeleteOutlined style={{ color: '#ef476f' }} /></a>
                    </Popconfirm>

                </Space >
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const tableProps = {
        loading: loading,
        size: 'large',
        // bordered: true,
        // expandable,
        // title: showTitle ? defaultTitle : undefined,
        // showHeader,
        // footer: showfooter ? defaultFooter : undefined,
        // rowSelection,
        // scroll,
        // tableLayout,
    };

    //table

    return (
        <div
            style={{
                padding: 24,
                minHeight: '50vh',
                background: 'white',
                borderRadius: 16
            }}
        >
            <Button type='primary' icon={<PlusOutlined />} onClick={() => navigate('add')} style={{ marginBottom: 30 }}>Add</Button>

            <Table columns={columns} dataSource={store} {...tableProps} pagination={false} style={{ margin: '20px 0' }} />
            <Pagination
                total={10}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                defaultPageSize={20}
                defaultCurrent={1}
            />

        </div>
    );
}