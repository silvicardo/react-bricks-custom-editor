import { Link, LinkGetProps, navigate } from "@reach/router";
import React from "react";
import { types } from "react-bricks";
import bricks from "./bricks";
import pageTypeSchema from "./pageTypeSchema";

const config = {
    appId: process.env.REACT_APP_BRICKS_APP_ID!,
    apiKey: process.env.REACT_APP_BRICKS_API_KEY!,
    pageTypeSchema,
    bricks,
    renderLocalLink: (({ href, children, className, activeClassName }) => {
        const isActive = ({ isCurrent }: LinkGetProps) => {
            return isCurrent ? { className: activeClassName } : {};
        };

        return (
            <Link to={href} className={className} getProps={isActive}>
                {children}
            </Link>
        );
    }) as types.RenderLocalLink,
    navigate,
    loginPath: "/login",
    editorPath: "/editor",
    playgroundPath: "/playground",
    appSettingsPath: "/app-settings",
    appRootElement: "#root",
};

export default config;
