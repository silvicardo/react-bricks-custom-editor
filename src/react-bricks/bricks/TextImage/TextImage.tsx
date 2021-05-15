import classNames from "classnames";
import React from "react";
import { Image, RichText, Text, types } from "react-bricks";
import BlockNames from "../blockNames";
import styles from "./TextImage.module.css";

//=============================
// Enums
//=============================
const ImageSide = {
    Right: "RIGHT",
    Left: "LEFT",
} as const;
const Colors = {
    white: { value: "#fff", label: "White" },
    lightGray: { value: "#f7fafc", label: "Light Gray" },
} as const;

interface TextImageProps {
    backgroundColor: typeof Colors[keyof typeof Colors];
    imageSide: typeof ImageSide[keyof typeof ImageSide];
    title: string;
    text: string;
    rounded: boolean;
}

//=============================
// Component to be rendered
//=============================
const TextImage: types.Brick<TextImageProps> = ({ backgroundColor, imageSide, rounded }) => {
    return (
        <section className={styles.text_image} style={{ backgroundColor: backgroundColor.value }}>
            <div
                className={classNames(styles.container, {
                    [styles.container_reverse]: imageSide === ImageSide.Left,
                })}
            >
                <React.Fragment>
                    <div
                        className={classNames(styles.text_container, {
                            [styles.text_container_right]: imageSide === ImageSide.Left,
                        })}
                    >
                        <Text
                            renderBlock={(props) => <h2>{props.children}</h2>}
                            placeholder="Type a title..."
                            propName="title"
                        />
                        <RichText
                            renderBlock={(props) => <p>{props.children}</p>}
                            placeholder="Type a text..."
                            propName="text"
                            allowedFeatures={[
                                types.RichTextFeatures.Bold,
                                types.RichTextFeatures.Italic,
                                types.RichTextFeatures.Highlight,
                                types.RichTextFeatures.Link,
                            ]}
                        />
                    </div>
                    <div
                        className={classNames(styles.image_container, {
                            [styles.image_container_right]: imageSide === ImageSide.Right,
                        })}
                    >
                        <Image
                            imageClassName={classNames(styles.image, {
                                [styles.image_rounded]: rounded,
                            })}
                            alt="fallback"
                            propName="imageSource"
                        />
                    </div>
                </React.Fragment>
            </div>
        </section>
    );
};

//=============================
// Get Default Props
//=============================
const getDefaultProps = (): TextImageProps => ({
    backgroundColor: Colors.white,
    imageSide: ImageSide.Right,
    title: "You can trust us",
    text: "We create and host websites since 1997. We saw the Internet grow up as the standards evolved. We have built hundreds of successful web applications and we still have a lot of fun.",
    rounded: false,
});

//=============================
// Side Edit Props
//=============================

const sideEditProps: (types.ISideEditProp | types.ISideGroup)[] = [
    {
        name: "backgroundColor",
        label: "Background",
        type: types.SideEditPropType.Select,
        selectOptions: {
            display: types.OptionsDisplay.Color,
            options: [
                { label: "white", value: { color: Colors.white } },
                { label: "light-gray", value: { color: Colors.lightGray } },
            ],
        },
    },
    {
        name: "imageSide",
        label: "Image on side",
        type: types.SideEditPropType.Select,
        selectOptions: {
            display: types.OptionsDisplay.Radio,
            options: [
                { value: ImageSide.Right, label: "Right" },
                { value: ImageSide.Left, label: "Left" },
            ],
        },
    },
    {
        name: "rounded",
        label: "Rounded border",
        type: types.SideEditPropType.Boolean,
    },
];

//=============================
// Exported BlockType Schema
//=============================
TextImage.schema = {
    name: BlockNames.TextImage,
    label: "Text-Image",
    getDefaultProps,
    sideEditProps,
};

export default TextImage;
