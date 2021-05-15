import React from "react";
import { useVisualEdit } from "react-bricks";
import CustomEditor from "./index";
import NodesViewer from "./nodes/NodesViewer";
import { NodesState } from "./editorReducer";
import nodeTypes from "./nodes/nodeTypes";
import { textNodeTagTypes } from "./nodes/nodes";

interface CustomEditorVisualComponentProps {
    propName: string;
    textComponent: React.FC<any>;
}

function CustomEditorVisualComponent({ propName, textComponent: TextComponent }: CustomEditorVisualComponentProps) {
    const [value, setValue, isReadOnly] = useVisualEdit(propName);

    if (isReadOnly) {
        const nodesData = JSON.stringify(value) as unknown as NodesState["nodes"];
        return <NodesViewer nodes={nodesData} />;
    }
    return <CustomEditor textComponent={TextComponent} propName={propName} value={value} setValue={setValue} />;
}

CustomEditorVisualComponent.defaultValue = JSON.stringify([
    {
        id: 1,
        type: nodeTypes.TEXT,
        props: {
            tagType: textNodeTagTypes.SPAN,
            children: "",
        },
    },
]);

export default CustomEditorVisualComponent;
