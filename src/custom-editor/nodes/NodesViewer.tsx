import { Fragment } from "react";
import { IconNode, textNodeTagTypes } from "./nodes";
import nodeTypes from "./nodeTypes";

interface NodeViewerProps {
    nodes: object[];
    placeholder?: string;
}

export default function NodesViewer({ nodes, placeholder = "clicca per editare questo testo" }: NodeViewerProps) {
    if (nodes.length == 1 && nodes[0].props.children.length === 0) {
        return <>{placeholder}</>;
    }
    return (
        <>
            {nodes.map((node) => {
                if (node.type === nodeTypes.TEXT) {
                    return node.tagType === textNodeTagTypes.BOLD ? (
                        <b key={node.id}>{node.props.children}</b>
                    ) : (
                        <Fragment key={node.id}>{node.props.children}</Fragment>
                    );
                }
                if (node.type == nodeTypes.STAR) {
                    return <IconNode type={nodeTypes.STAR} key={node.id} id={node.id} />;
                }
                if (node.type == nodeTypes.SPACE) {
                    return <Fragment key={node.id}> </Fragment>;
                }
                if (node.type == nodeTypes.BR) {
                    return <br key={node.id} />;
                }
            })}
        </>
    );
}
