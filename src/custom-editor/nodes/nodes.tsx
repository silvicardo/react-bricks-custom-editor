import nodeTypes from './nodeTypes';

interface NodeProps {
    id: number;
    type: string;
}

interface SpaceNodeProps extends NodeProps {
    type: typeof nodeTypes["SPACE"];
    onClick: VoidFunction;
}

export const SpaceNode : React.VFC<SpaceNodeProps> = ({ id, onClick }) => {
    return (
        <span data-gc-edit-id={id} onClick={onClick}>
            {" "}
        </span>
    );
};

export const textNodeTagTypes = {
    SPAN: "span",
    BOLD: "bold",
} as const;

interface TextNodeProps extends NodeProps {
    type: typeof nodeTypes["TEXT"] ;
    onClick: VoidFunction;
    tagType?:typeof textNodeTagTypes["SPAN" | "BOLD"];
    isSelected: boolean;
}

export const TextNode : React.FC<TextNodeProps>= ({ children, tagType = "", id, onClick, isSelected }) => {
    const style = {
        textDecoration: isSelected ? "underline" : "none",
    };

    if (tagType === "bold") {
        return (
            <b data-gc-edit-id={id} onClick={onClick} style={style}>
                {children}
            </b>
        );
    }
    return (
        <span data-gc-edit-id={id} onClick={onClick} style={style}>
            {children}
        </span>
    );
};



interface StarNodeProps extends NodeProps {
    type: typeof nodeTypes["STAR"] ;
}

export const StarNode : React.VFC<StarNodeProps> = ({ id }) => (
    <span
        data-gc-edit-id={id}
        className="icon-av-star-dark star-icon vcenter inline-block"
        style={{ width: "14px", height: "14px" }}
    />
);

interface SpaceNodeProps extends NodeProps {
    type: typeof nodeTypes["SPACE"] ;
}

export const BrNode : React.VFC<SpaceNodeProps> = ({ id }) => <br data-gc-edit-id={id} />;