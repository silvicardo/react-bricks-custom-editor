import classNames from "classnames";
import React from "react";
import { RichText, types, useAdminContext } from "react-bricks";
import CustomEditorVisualComponent from "../../../custom-editor/CustomEditorVisualComponent";
import BlockNames from "../blockNames";
import styles from "./HeroUnit.module.css";
import UnitContextProvider from "../../../custom-editor/UnitContext";

//=============================
// Padding enum
//=============================
const Padding = {
    Big: "BIG",
    Small: "SMALL",
} as const;

interface HeroUnitProps {
    padding: typeof Padding[keyof typeof Padding];
    title: string;
    text: string;
}

//=============================
// Component to be rendered
//=============================
const HeroUnit: types.Brick<HeroUnitProps> = ({ padding }) => {
    const { isAdmin } = useAdminContext();

    return (
        <UnitContextProvider isAdmin={isAdmin}>
            <div
                className={classNames(
                    styles.heroUnit,
                    { [styles.pySmall]: padding === Padding.Small },
                    { [styles.pyBig]: padding === Padding.Big }
                )}
            >
                {/*<Text renderBlock={(props) => <h1>{props.children}</h1>} placeholder="Type a title..." propName="title" />*/}
                <CustomEditorVisualComponent textComponent={(props) => <p>{props.children}</p>} propName="title" />
                <RichText
                    renderBlock={(props) => <p>{props.children}</p>}
                    placeholder="Type a text..."
                    propName="text"
                    allowedFeatures={[
                        types.RichTextFeatures.Bold,
                        types.RichTextFeatures.Italic,
                        types.RichTextFeatures.Highlight,
                        types.RichTextFeatures.Code,
                        types.RichTextFeatures.Link,
                    ]}
                    renderCode={(props) => (
                        <code
                            style={{
                                fontSize: 13,
                                padding: "2px 4px",
                                backgroundColor: "#e2e8f0",
                                borderRadius: 3,
                            }}
                        >
                            {props.children}
                        </code>
                    )}
                />
            </div>
        </UnitContextProvider>
    );
};

//=============================
// Get Default Props
//=============================
const getDefaultProps = (): HeroUnitProps => ({
    padding: Padding.Big,
    title: CustomEditorVisualComponent.defaultValue,
    text: "We are a hi-tech web development company committed to deliver great products on time. We love to understand our customers' needs and exceed expectations.",
});

//=============================
// Side Edit Props
//=============================
const sideEditProps: (types.ISideEditProp | types.ISideGroup)[] = [
    {
        name: "padding",
        label: "Padding",
        type: types.SideEditPropType.Select,
        selectOptions: {
            display: types.OptionsDisplay.Select,
            options: [
                { value: Padding.Big, label: "Big Padding" },
                { value: Padding.Small, label: "Small Padding" },
            ],
        },
    },
];

//=============================
// Exported BlockType Schema
//=============================
HeroUnit.schema = {
    name: BlockNames.HeroUnit,
    label: "Hero Unit",
    getDefaultProps,
    sideEditProps,
};

export default HeroUnit;
