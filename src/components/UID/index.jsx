import { useId } from "react";

const UID = () => {
    const uid = useId();
    return uid;
};

export default UID;
