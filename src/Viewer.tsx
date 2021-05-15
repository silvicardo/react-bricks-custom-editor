import { RouteComponentProps } from "@reach/router";
import React, { useContext } from "react";
import { cleanPage, PageViewer, ReactBricksContext, usePage } from "react-bricks";
const Viewer: React.VFC<RouteComponentProps> = () => {
    const PAGE_SLUG = "home" as const;

    const { data } = usePage(PAGE_SLUG);
    const { pageTypes, bricks } = useContext(ReactBricksContext);

    if (!data) {
        return <p>well, well.....</p>;
    }

    // Clean the received content
    // Removes unknown or not allowed bricks
    const page = cleanPage(data, pageTypes, bricks);

    return <PageViewer page={page} />;
};

export default Viewer;
