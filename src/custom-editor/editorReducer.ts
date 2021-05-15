import produce, { Draft, original } from "immer";
import nodeTypes from "./nodes/nodeTypes";
import { textNodeTagTypes } from "./nodes/nodes";

export type Node =
    | {
          id: number;
          type: typeof nodeTypes.SPACE | typeof nodeTypes.BR | typeof nodeTypes.STAR;
          props: {
              children: string;
          };
      }
    | {
          id: number;
          type: typeof nodeTypes.TEXT;
          props: {
              tagType: typeof textNodeTagTypes.BOLD | typeof textNodeTagTypes.SPAN | "";
              children: string;
          };
      };

export type NodesState = {
    selected: number;
    settings: {
        isBoldOn: boolean;
    };
    nodes: Node[];
};

// ***** redux types ***** //
interface Action<T = any> {
    type: T;
}

export interface AnyAction extends Action {
    // Allows any extra properties to be defined in an action.
    [extraProps: string]: any;
}
// ***** redux types -> end ***** //

export default function nodesReducer(state: NodesState, action: AnyAction) {
    const nextState = produce(state, (draftState: Draft<NodesState>) => {
        const originalState = original(draftState) as NodesState;
        console.log("originalState", originalState, "action:", action);
        const isLastNodeASpaceNode = originalState.nodes[originalState.nodes.length - 1].type === nodeTypes.SPACE;
        const isLastAvailableNode =
            originalState.nodes[originalState.nodes.length - 1].id === originalState.nodes.length;

        switch (action.type) {
            case "REMOVE_LAST_NODE":
                if (originalState.nodes.length > 0) {
                    draftState.nodes.pop();
                    draftState.selected = originalState.nodes.length - 1;
                }
                break;
            case "SET_SELECTED_NODE":
                const desiredNode = originalState.nodes.find((node) => node.id === action.payload);
                if (desiredNode?.type !== nodeTypes.SPACE) {
                    draftState.selected = action.payload;
                }
                break;
            case "SET_EDITOR_POINTER_AT_NEW_CLEAN_TEXT_NODE":
                if (!isLastNodeASpaceNode) {
                    draftState.nodes.push({
                        id: originalState.nodes.length + 1,
                        type: nodeTypes.SPACE,
                        props: {
                            children: " ",
                        },
                    });
                }

                draftState.nodes.push({
                    id: originalState.nodes.length + (isLastNodeASpaceNode ? 1 : 2),
                    type: nodeTypes.TEXT,
                    props: {
                        tagType: "",
                        children: "",
                    },
                });
                draftState.selected = originalState.nodes.length + (isLastNodeASpaceNode ? 1 : 2);
                break;
            case "REACH_LAST_VALID_TEXT_NODE":
                if (originalState.nodes[originalState.nodes.length - 1].type === nodeTypes.TEXT) {
                    draftState.selected = originalState.nodes.length;
                } else if (originalState.nodes[originalState.nodes.length - 1].type === nodeTypes.SPACE) {
                    draftState.nodes.push({
                        id: originalState.nodes.length + 1,
                        type: nodeTypes.TEXT,
                        props: {
                            tagType: "",
                            children: "",
                        },
                    });
                    draftState.selected = originalState.nodes.length + 1;
                } else {
                    draftState.nodes.push({
                        id: originalState.nodes.length + 1,
                        type: nodeTypes.SPACE,
                        props: {
                            children: " ",
                        },
                    });
                    draftState.nodes.push({
                        id: originalState.nodes.length + 2,
                        type: nodeTypes.TEXT,
                        props: {
                            tagType: "",
                            children: "",
                        },
                    });
                    draftState.selected = originalState.nodes.length + 2;
                }

                break;
            case "ADD_TEXT_NODE":
                draftState.nodes.push({
                    id: draftState.nodes.length + 1,
                    type: nodeTypes.TEXT,
                    props: {
                        tagType: "",
                        children: "",
                    },
                });
                draftState.selected = originalState.nodes.length + 1;
                break;

            case "ADD_TEXT_SPACE_NODE":
                draftState.nodes.push({
                    id: draftState.nodes.length + 1,
                    type: nodeTypes.SPACE,
                    props: {
                        children: " ",
                    },
                });
                draftState.selected = originalState.nodes.length + 1;
                break;
            case "EDIT_CURRENT_TEXT_NODE":
                draftState.nodes = draftState.nodes.map((currentNode) => {
                    if (currentNode.id === draftState.selected) {
                        return {
                            ...currentNode,
                            type: action.payload.type ? action.payload.type : currentNode.type,
                            props: {
                                ...currentNode.props,
                                children: action.payload.text,
                            },
                        };
                    }
                    return currentNode;
                });
                break;
            case "TOGGLE_BOLD_ON_SELECTED_NODE":
                draftState.nodes = draftState.nodes.map((currentNode) => {
                    if (currentNode.id === draftState.selected && currentNode.type === nodeTypes.TEXT) {
                        return {
                            ...currentNode,
                            props: {
                                ...currentNode.props,
                                tagType:
                                    currentNode.props.tagType === textNodeTagTypes.BOLD ? "" : textNodeTagTypes.BOLD,
                            },
                        };
                    }
                    return currentNode;
                });
                break;
            case "ADD_BR_NODE":
                draftState.nodes.push({
                    id: draftState.nodes.length + 1,
                    type: nodeTypes.BR,
                    props: {
                        children: "",
                    },
                });
                draftState.selected = originalState.nodes.length + 1;
                break;
            case "ADD_STAR_NODE":
                draftState.nodes.push({
                    id: draftState.nodes.length + 1,
                    type: nodeTypes.STAR,
                    props: {
                        children: "",
                    },
                });
                draftState.selected = originalState.nodes.length + 1;
                break;
            case "ADD_NODE_TYPE_BOLD":
                draftState.nodes.push({
                    id: draftState.nodes.length + 1,
                    type: nodeTypes.TEXT,
                    props: {
                        tagType: textNodeTagTypes.BOLD,
                        children: "",
                    },
                });
                draftState.selected = originalState.nodes.length + 1;
                break;
        }
        return draftState;
    });
    console.log("nextState", nextState);
    return nextState;
}
