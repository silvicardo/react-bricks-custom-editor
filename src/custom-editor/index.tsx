import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { UnitContext } from "./UnitContext";
import nodesReducer, { AnyAction } from "./editorReducer";
import { useVisualEdit } from "react-bricks";
import FakeCursor from "./FakeCursor";
import NodesViewer from "./nodes/NodesViewer";
import NodesEditor from "./nodes/NodesEditor";
import nodeTypes from "./nodes/nodeTypes";

interface CustomEditorProps {
    value: string;
    setValue: ReturnType<typeof useVisualEdit>[1];
    textComponent: React.FC<any>;
    propName: string;
}

const CustomEditor: React.VFC<CustomEditorProps> = ({
    value: nodes,
    setValue: setNodes,
    textComponent: TextComponent,
    propName,
}) => {
    const { editingPropName, setEditingPropName } = useContext(UnitContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const [nextText, setNextText] = useState("");
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [nodesState, dispatch] = useReducer(nodesReducer, {
        selected: 1,
        settings: {
            isBoldOn: false,
        },
        nodes: JSON.parse(nodes),
    });

    const [isSubmittingNodes, setIsSubmittingNodes] = useState(false);

    const loggedDispatch = (action: AnyAction) => {
        dispatch(action);
        if (editingPropName !== propName) {
            setEditingPropName(propName);
        }
        //console.log("dipatched: ", action);
    };

    const onEditableNodeClick = (id: number) => {
        if (isEditorOpen) {
            loggedDispatch({ type: "SET_SELECTED_NODE", payload: id });
        }
    };

    const toggleEditor = () => {
        setIsEditorOpen((prevIsOpen) => {
            if (prevIsOpen === false && nodesState.nodes.length > 1) {
                loggedDispatch({ type: "SET_EDITOR_POINTER_AT_NEW_CLEAN_TEXT_NODE" });
            } else {
                loggedDispatch({ type: "SET_SELECTED_NODE", payload: nodesState.nodes.length });
            }
            return !prevIsOpen;
        });
    };

    const onAddStar = () => {
        loggedDispatch({ type: "ADD_STAR_NODE" });
        setNextText("");
        (inputRef.current as HTMLInputElement).focus();
        (inputRef.current as HTMLInputElement).selectionStart = (inputRef.current as HTMLInputElement).value.length;
        (inputRef.current as HTMLInputElement).selectionEnd = (inputRef.current as HTMLInputElement).value.length;
    };

    const onAddNextLine = () => {
        loggedDispatch({ type: "ADD_BR_NODE" });
        setNextText("");
        (inputRef.current as HTMLInputElement).focus();
        (inputRef.current as HTMLInputElement).selectionStart = (inputRef.current as HTMLInputElement).value.length;
        (inputRef.current as HTMLInputElement).selectionEnd = (inputRef.current as HTMLInputElement).value.length;
    };

    const onToggleBold = () => {
        loggedDispatch({ type: "TOGGLE_BOLD_ON_SELECTED_NODE" });

        loggedDispatch({ type: "REACH_LAST_VALID_TEXT_NODE" });
        (inputRef.current as HTMLInputElement).focus();
        (inputRef.current as HTMLInputElement).selectionStart = (inputRef.current as HTMLInputElement).value.length;
        (inputRef.current as HTMLInputElement).selectionEnd = (inputRef.current as HTMLInputElement).value.length;
    };

    const onNextTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target?.value) {
            console.log("onChange", event);
            if (nodesState.nodes[nodesState.selected - 1].type !== "text") {
                loggedDispatch({ type: "ADD_TEXT_NODE" });
            }
            loggedDispatch({
                type: "EDIT_CURRENT_TEXT_NODE",
                payload: { text: event.target.value.trimEnd() },
            });
            setNextText(event.target.value.trimEnd());
        }
    };

    const onKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.keyCode === 32) {
            //spacebar
            loggedDispatch({ type: "ADD_TEXT_SPACE_NODE" });
            //loggedDispatch({ type: "ADD_TEXT_NODE" });
            setNextText("");
            return;
        }

        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Meta"].includes(event.key)) {
            (inputRef.current as HTMLInputElement).selectionStart = (inputRef.current as HTMLInputElement).value.length;
            (inputRef.current as HTMLInputElement).selectionEnd = (inputRef.current as HTMLInputElement).value.length;
            return;
        }

        if (event.key === "Enter") {
            onAddNextLine();
            return;
        }

        if (event.key === "Backspace") {
            const selectedNode = { ...nodesState.nodes[nodesState.selected - 1] };
            if (selectedNode.type !== nodeTypes.TEXT) {
                //is any element that has to be deleted with a single backspace
                const textNextEditingNode = nodesState.nodes[nodesState.selected - 2].props.children;
                loggedDispatch({ type: "REMOVE_LAST_NODE" });
                setNextText(textNextEditingNode);
                return;
            }

            if (selectedNode.type === "text" && [0, 1].includes(selectedNode.props.children.length)) {
                if (selectedNode.id > 1) {
                    //is not the last node in the array
                    const textNextEditingNode = nodesState.nodes[nodesState.selected - 2].props.children;
                    loggedDispatch({ type: "REMOVE_LAST_NODE" });
                    setNextText(textNextEditingNode);
                } else {
                    //is the last in the array and must not be deleted
                    loggedDispatch({ type: "EDIT_CURRENT_TEXT_NODE", payload: { text: "" } });
                    setNextText("");
                }
                return;
            }
            //is a text node with more than ore char in it
            const value = (event.target as HTMLInputElement).value.trimEnd();
            loggedDispatch({ type: "EDIT_CURRENT_TEXT_NODE", payload: { text: value } });
            setNextText(value);

            return;
        }
    };

    useEffect(() => {
        (inputRef.current as HTMLInputElement).focus();
        (inputRef.current as HTMLInputElement).selectionStart = (inputRef.current as HTMLInputElement).value.length;
        (inputRef.current as HTMLInputElement).selectionEnd = (inputRef.current as HTMLInputElement).value.length;
    }, [nextText]);

    useEffect(() => {
        if (isEditorOpen) {
            (inputRef.current as HTMLInputElement).focus();
            (inputRef.current as HTMLInputElement).selectionStart = (inputRef.current as HTMLInputElement).value.length;
            (inputRef.current as HTMLInputElement).selectionEnd = (inputRef.current as HTMLInputElement).value.length;
        } else {
            (inputRef.current as HTMLInputElement).focus();
            setIsSubmittingNodes(true);
        }
    }, [isEditorOpen]);

    useEffect(() => {
        if (!isSubmittingNodes) {
            setNodes(JSON.stringify(nodesState.nodes));
            setIsSubmittingNodes(false);
        }
    }, [nodesState, isSubmittingNodes, setNodes]);

    useEffect(() => {
        if (isEditorOpen && editingPropName !== propName) {
            setIsEditorOpen(false);
        }
    }, [editingPropName, propName, isEditorOpen]);

    return (
        <>
            {isEditorOpen && (
                <>
                    {/*<div>{"selectedNode: " + nodesState.selected}</div> */}
                    <div>
                        <div>
                            <div
                                className={"px-20 py-10 bg-gc-main-white"}
                                style={{ display: "inline-flex", border: "1px solid #1E201F" }}
                            >
                                <button className={"px-20 py-10 btn-secondary"} onClick={onAddStar}>
                                    <div
                                        className="icon-av-star-dark star-icon vcenter"
                                        style={{ width: "14px", height: "14px" }}
                                    />{" "}
                                </button>
                                <button className={"px-20 py-10 btn-secondary"} onClick={onAddNextLine}>
                                    {"<br>"}
                                </button>
                                <button className={"px-20 py-10 btn-secondary"} onClick={onToggleBold}>
                                    <b>BOLD</b>
                                </button>
                                <button className={"px-20 py-10 btn-primary"} onClick={toggleEditor}>
                                    <b>CLOSE EDITING VIEW</b>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <div className={"toolbar"} style={{ height: true ? 0 : "auto", overflow: "hidden" }}>
                <input
                    ref={inputRef}
                    autoComplete={"off"}
                    name={"next-text"}
                    value={nextText}
                    onChange={onNextTextInputChange}
                    onKeyUp={onKeyUp}
                    style={{ height: true ? 0 : "auto" }}
                />
            </div>
            <div onClick={toggleEditor}>
                <TextComponent>
                    {isEditorOpen ? (
                        <>
                            {nodesState.nodes.length > 0 &&
                                nodesState.nodes.map(({ id, type, props }) => (
                                    <NodesEditor
                                        key={id}
                                        id={id}
                                        type={type}
                                        isSelected={isEditorOpen && nodesState.selected === id}
                                        {...props}
                                        onClick={onEditableNodeClick}
                                    />
                                ))}
                            <FakeCursor />
                        </>
                    ) : (
                        <NodesViewer nodes={nodesState.nodes} />
                    )}
                </TextComponent>
            </div>
        </>
    );
};
export default CustomEditor;
