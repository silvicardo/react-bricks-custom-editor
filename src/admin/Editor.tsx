import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Admin, Editor } from "react-bricks";
const EditorPage: React.VFC<RouteComponentProps> = () => {
    return (
        <Admin>
            <Editor />
        </Admin>
    );
};

export default EditorPage;
