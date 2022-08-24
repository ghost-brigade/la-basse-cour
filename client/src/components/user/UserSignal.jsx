import { useContext } from "react";
import { useState } from "react";
import ModalContext from "../../contexts/modal/ModalContext";
import { getReasons, reportUser } from "../../utils/report_management";
import SendButton from "../form/SendButton";

const UserSignal = (props) => {
    const {modal, setModal} = useContext(ModalContext);
    const [reason, setReason] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!reason) {
            return;
        }

        const report = await reportUser({
            ...modal.data,
            'reason': reason,
            'comment': comment
        });
        if (report) {
            setModal(null);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="reason">Raison</label>
                <select 
                    id='reason'
                    name='reason'
                    className="form-control" 
                    onChange={(event) => setReason(event.target.value)}
                    value={reason}
                >
                    <option>Choisir la raison</option>
                    {getReasons().map(reason => 
                        <option key={`reason_${reason.id}`} value={reason.id}>
                            {reason.label}
                        </option>
                    )}
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="comment">Raison</label>
                <textarea 
                    id='comment'
                    name='comment'
                    className="form-control"
                    value={comment} 
                    onChange={(event) => setComment(event.target.value)}
                />
            </div>
            <SendButton />
        </form>
    );
}

export default UserSignal;