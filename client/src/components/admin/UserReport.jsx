import { getUserTitle } from "../../utils/user_management";
import { getReasons, translateReason } from "../../utils/report_management";

const UserReport = (props) => {
    const {reportId, user, reason, comment} = props;

    const handleCheck = () => {
        props.handleCheck(reportId);
    }
    const handleBan = () => {
        props.handleBan(reportId);
    }

    return (
        <div className="app_card app_user-preview app_admin-user-report">
            <div className="user">
                <img src={user.img} alt='' className="mr-2"/>
                {getUserTitle(user)}
            </div>
            {
                reason
                    ? <p className="reason"><b>{translateReason(reason)}</b></p>
                    : ''
            }
            {
                comment
                    ? 
                        <div className="comment">
                            <p>"{comment}"</p>
                        </div>
                    : ''
            }
            <div className="app_buttons-container m-0">
                <button className="px-3 app_success" onClick={handleCheck}>
                    <i className="fa fa-check mr-2"/> Vu
                </button>
                <button className="px-3 app_danger" onClick={handleBan}>
                    <i className="fa fa-ban mr-2"/> Bannir
                </button>
            </div>
        </div>
    );
}

export default UserReport;