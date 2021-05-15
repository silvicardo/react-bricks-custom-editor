import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Admin, Playground } from "react-bricks";

const PlaygroundPage: React.VFC<RouteComponentProps> = () => {
    return (
        <Admin>
            <Playground />
        </Admin>
    );
};

export default PlaygroundPage;
