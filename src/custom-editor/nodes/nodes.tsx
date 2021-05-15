import nodeTypes from "./nodeTypes";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import iconStar from "./../../assets/icon-star-dark.svg";

interface NodeProps {
    id: number;
    type: string;
}

interface SpaceNodeProps extends NodeProps {
    type: typeof nodeTypes["SPACE"];
    onClick: (id: number) => void;
}

export const SpaceNode: React.VFC<SpaceNodeProps> = ({ id, onClick }) => {
    return (
        <span
            data-edit-it={id}
            onClick={(e) => {
                e.stopPropagation();
                onClick(id);
            }}
        >
            {" "}
        </span>
    );
};

export const textNodeTagTypes = {
    SPAN: "span",
    BOLD: "bold",
} as const;

interface TextNodeProps extends NodeProps {
    type: typeof nodeTypes["TEXT"];
    onClick: (id: number) => void;
    tagType: typeof textNodeTagTypes["SPAN" | "BOLD"];
    isSelected: boolean;
}

export const TextNode: React.FC<TextNodeProps> = ({ children, tagType, id, onClick, isSelected }) => {
    const style = {
        textDecoration: isSelected ? "underline" : "none",
    };

    const Element = {
        [textNodeTagTypes.BOLD]: ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLBaseFontElement>>) => (
            <b {...rest}>{children}</b>
        ),
        [textNodeTagTypes.SPAN]: ({ children, ...rest }: PropsWithChildren<HTMLAttributes<HTMLBaseFontElement>>) => (
            <span {...rest}>{children}</span>
        ),
    }[tagType];

    const onClicked: React.MouseEventHandler<HTMLBaseFontElement> = (e) => {
        e.stopPropagation();
        onClick(id);
    };
    return (
        <Element data-edit-it={id} onClick={onClicked} style={style}>
            {children}
        </Element>
    );
};

interface IconNodeProps extends NodeProps {
    type: typeof nodeTypes["STAR"];
    size?: Pick<React.CSSProperties, "height" | "width">;
}

const StarNode: React.VFC<Omit<IconNodeProps, "type">> = ({ id, size }) => (
    <img data-edit-it={id} style={{ ...size, display: "inline-block" }} src={iconStar} alt={"star"} />
);

export const IconNode: React.VFC<IconNodeProps> = ({ id, type, size = { width: 15, height: 15 } }) => {
    const componentByType = {
        [nodeTypes.STAR]: StarNode,
    };

    const Icon = componentByType[type];

    return <Icon id={id} size={size} />;
};

interface BrNodeProps extends NodeProps {
    type: typeof nodeTypes["BR"];
}

export const BrNode: React.VFC<BrNodeProps> = ({ id }) => <br data-edit-it={id} />;
