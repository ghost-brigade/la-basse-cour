import { createContext } from "react";

const ModalContext = createContext({
    modal: null,
    setModal: () => {}
});

export default ModalContext;