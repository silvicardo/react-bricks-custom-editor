import React from "react";
import { BrNode, IconNode, SpaceNode, TextNode, textNodeTagTypes } from "./nodes";
import nodeTypes from "./nodeTypes";

interface NodesEditorProps {
    id: number;
    onClick: (id: number) => void;
    type?: typeof nodeTypes[keyof typeof nodeTypes];
    isSelected: boolean;
    tagType?: typeof textNodeTagTypes[keyof typeof textNodeTagTypes];
    children?: string;
}
export default function NodesEditor({
    id,
    onClick,
    type = "text",
    tagType = "span",
    isSelected,
    children = "",
}: NodesEditorProps) {
    if (type === nodeTypes.TEXT) {
        return (
            <TextNode
                type={nodeTypes.TEXT}
                id={id}
                tagType={tagType}
                onClick={onClick}
                isSelected={isSelected}
                children={children}
            />
        );
    }
    if (type === nodeTypes.SPACE) {
        return <SpaceNode id={id} onClick={onClick} type={nodeTypes.SPACE} />;
    }

    if (type === nodeTypes.STAR) {
        return <IconNode type={nodeTypes.STAR} id={id} />;
    }

    if (type === nodeTypes.BR) {
        return <BrNode id={id} type={nodeTypes.BR} />;
    }
    return null;
}
