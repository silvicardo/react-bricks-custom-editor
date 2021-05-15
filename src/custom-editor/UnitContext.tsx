import React, { PropsWithChildren, useState } from "react";
import { useAdminContext } from "react-bricks";

interface IUnitContextValue {
    isAdmin: boolean;
    editingPropName: string;
    setEditingPropName: React.Dispatch<React.SetStateAction<string>>;
}

export const UnitContext = React.createContext({} as IUnitContextValue);

function UnitContextProvider({ children, isAdmin }: PropsWithChildren<{isAdmin : boolean}>) {
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

export default function BricksUnitContextProvider({children} : PropsWithChildren<{}>){
    const {isAdmin} = useAdminContext()
    return <UnitContextProvider isAdmin={isAdmin}>{children}</UnitContextProvider>
}
