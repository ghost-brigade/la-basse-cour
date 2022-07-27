import { useContext } from "react";
import ModalContext from "../../contexts/modal/ModalContext";
import Modal from "./Modal";

const ModalContainer = (props) => {
    const {modal, setModal} = useContext(ModalContext);

    if (!modal) {
        return null;
    }

    return (
        <div className="app_modal-container">
            <Modal/>
        </div>
    )
}

export default ModalContainer;