import React, { PropsWithChildren, useState } from "react";

interface IUnitContextValue {
    isAdmin: boolean;
    editingPropName: string;
    setEditingPropName: React.Dispatch<React.SetStateAction<string>>;
}

export const UnitContext = React.createContext({} as IUnitContextValue);

export default function UnitContextProvider({ children, isAdmin }: PropsWithChildren<{ isAdmin: boolean }>) {
    const [editingPropName, setEditingPropName] = useState("");

    return (
        <UnitContext.Provider
            value={{
                isAdmin,
                editingPropName,
                setEditingPropName,
            }}
        >
            {children}
        </UnitContext.Provider>
    );
}
