import { storeItem } from "../utils/storeItem";
import Main from "../layout/main";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const authVerification = () => {
    const { user } = UserAuth();
    // const { userToken } = storeItem();
    console.log('checks : ', user ? 1 : 0);
    const isVerified = user ? 1 : 0;
    // const isVerified = Object.keys(user).length > 0 ? 1 : 0;
    return isVerified;

    //     // const { userToken } = storeItem();
    //     // // console.log('user token : ', userToken);
    //     // const isVerified = userToken ? 1 : 0;
    //     // return isVerified;
}

export default function PrivateRoute({ breadcumb, children }) {

    return authVerification() ?
        (<Main breadcumb={breadcumb}>{children}</Main>)
        :
        (<Navigate to="/auth/login" replace={true} />)
}