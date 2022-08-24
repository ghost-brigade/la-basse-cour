import { useContext } from "react";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { logout } from "../../utils/user_management";

const DisconnectButton = (props) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);

    const handleDisconnect = () => {
        if (logout()) {
            setCurrentUser(null);
        }
    }
    
    return (
        <button type="button" onClick={handleDisconnect} className="app_button-icon app_danger">
            <i className="fa fa-power-off"/> Déconnexion
        </button>
    )
}

export default DisconnectButton;