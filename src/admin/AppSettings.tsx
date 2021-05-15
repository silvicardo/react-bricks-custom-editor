import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Admin, AppSettings } from "react-bricks";
const AppSettingsPage: React.VFC<RouteComponentProps> = () => {
    return (
        <Admin>
            <AppSettings />
        </Admin>
    );
};

export default AppSettingsPage;
