import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Admin, Login } from "react-bricks";

const LoginPage: React.VFC<RouteComponentProps> = () => {
    return (
        <Admin isLogin>
            <Login />
        </Admin>
    );
};

export default LoginPage;
