import React from "react";
import { useVisualEdit } from "react-bricks";
import CustomEditor from "./index";
import NodesViewer from "./nodes/NodesViewer";
import { NodesState } from "./editorReducer";

interface CustomEditorVisualComponentProps {
    propName: string;
    textComponent: React.FC<any>;
}

const CustomEditorVisualComponent: React.VFC<CustomEditorVisualComponentProps> = ({
    propName,
    textComponent: TextComponent,
}) => {
    const [value, setValue, isReadOnly] = useVisualEdit(propName);

    if (isReadOnly) {
        const nodesData = JSON.stringify(value) as unknown as NodesState["nodes"];
        return <NodesViewer nodes={nodesData} />;
    }
    return <CustomEditor textComponent={TextComponent} propName={propName} value={value} setValue={setValue} />;
};

export default CustomEditorVisualComponent;
