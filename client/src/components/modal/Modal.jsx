import { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import ModalContext from "../../contexts/modal/ModalContext";

const Modal = (props) => {
    const ref = useRef();
    const {modal, setModal} = useContext(ModalContext);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                closeModal();
            }
        };
    
        setTimeout(() => {
            document.addEventListener('click', handleClick);
        }, 100);
    
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [ref]);

    const closeModal = () => {
        setModal(null);
    }

    return (
        <div ref={ref} className="app_modal">
            <h2 className="app_title-button">{modal.title} <i onClick={closeModal} className="fa fa-close"/></h2>
            <div className="content">
                {modal.content}
            </div>
        </div>
    );
}

export default Modal;