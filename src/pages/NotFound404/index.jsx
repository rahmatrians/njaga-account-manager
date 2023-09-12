import { Button, Result, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export default function NotFound404() {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        }}>
            {/* <img src="../../../public/404.svg" alt="not-found-404" style={{ width: '35%' }} /> */}
            <Result
                status="404"
                title={<Typography.Title style={{ color: 'white' }}>404</Typography.Title>}
                subTitle={<Typography.Paragraph style={{ color: 'white' }}>Sorry, the page you visited does not exist.</Typography.Paragraph>}
                extra={<Link to={-1}><Button icon={<LeftOutlined />} type="primary">Back</Button></Link>}
            />
        </div>
    );
}