import { RouteComponentProps } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { cleanPage, fetchPage, PageViewer, ReactBricksContext, types } from "react-bricks";
const ViewerFetch: React.VFC<RouteComponentProps> = () => {
    const PAGE_SLUG = "home";
    const [page, setPage] = useState<types.Page | null>(null);
    const { apiKey, pageTypes, bricks } = useContext(ReactBricksContext);

    useEffect(() => {
        fetchPage(PAGE_SLUG, apiKey).then((data) => {
            const myPage = cleanPage(data, pageTypes, bricks);
            setPage(myPage);
        });
    }, [apiKey, pageTypes, bricks]);

    if (page) {
        return <PageViewer page={page} />;
    }
    return null;
};

export default ViewerFetch;
