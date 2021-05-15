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
        <span data-edit-it={id} onClick={onClick}>
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

export const TextNode : React.FC<TextNodeProps>= ({ children, tagType = "span", id, onClick, isSelected }) => {
    const style = {
        textDecoration: isSelected ? "underline" : "none",
    };
    
    const Tag = ({bold: "b", span: "span"})[tagType] as keyof JSX.IntrinsicElements;
    
    return (
        <Tag data-edit-it={id} onClick={onClick} style={style}>
            {children}
        </Tag>
    );
    
};



interface IconNodeProps extends NodeProps {
    type: typeof nodeTypes["STAR"] ;
    size?: Pick<React.CSSProperties,"height" | "width">
}

const StarNode : React.VFC<Omit<IconNodeProps,"type">> = ({id, size}) => (
    <img
    data-edit-it={id}
    style={{...size, display: "inline-block" }}
    src="/icon-star-dark.svg"
/>
)

export const IconNode : React.VFC<IconNodeProps> = ({ id, type, size = { width: 15, height: 15 } }) => {
 const componentByType = {
     [nodeTypes.STAR] : StarNode
 }

 const Icon = componentByType[type];

 return <Icon id={id} size={size} />
};

interface SpaceNodeProps extends NodeProps {
    type: typeof nodeTypes["SPACE"] ;
}

export const BrNode : React.VFC<SpaceNodeProps> = ({ id }) => <br data-edit-it={id} />;