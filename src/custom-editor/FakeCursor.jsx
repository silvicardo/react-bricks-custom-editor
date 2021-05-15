import { useState } from "react";
import useInterval from "../utils/useInterval";

export default function FakeCursor(props) {
    const [isTransparent, setIsTransparent] = useState < boolean > false;
    useInterval(() => {
        setIsTransparent((prevIsTransparent) => !prevIsTransparent);
    }, 500);

    return (
        <span
            style={{
                display: "inline-block",
                width: "2px",
                height: "20px",
                background: "black",
                opacity: isTransparent ? 0 : 1,
            }}
        />
    );
}
