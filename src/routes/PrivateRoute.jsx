import { storeItem } from "../utils/storeItem";
import Main from "../layout/main";
import { Navigate } from "react-router-dom";

const authVerification = () => {
    const { userToken } = storeItem();
    // console.log('user token : ', userToken);
    const isVerified = userToken ? 1 : 0;
    return isVerified;
}

export default function PrivateRoute({ breadcumb, children }) {
    return authVerification() ?
        (<Main breadcumb={breadcumb}>{children}</Main>)
        :
        (<Navigate to="/auth/login" replace={true} />);
}