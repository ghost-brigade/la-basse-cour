import { useContext } from "react";
import { Link } from "react-router-dom";
import DiscussionContext from "../../contexts/discussion/DiscussionContext";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getPrivateDiscussion } from "../../utils/discussion_management";
import { getUserTitle } from "../../utils/user_management";
import OptionsWrapper from "../wrappers/OptionsWrapper";

const UserPreview = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const {setSelectedDiscussion} = useContext(DiscussionContext);
    const {user} = props;
    const handleSelectDiscussion = (userId) => {
        const discussion = getPrivateDiscussion(currentUser, userId);
        setSelectedDiscussion(discussion);
    }

    return (
        <div className="app_card app_user-preview">
            <img src={user.img} alt=''/>
            <h3 className="app_title-wrapper">
                <Link to={`/discussions`} onClick={() => handleSelectDiscussion(user.id)}>
                    {getUserTitle(user)}
                </Link>
                <OptionsWrapper>
                    <ul>
                        <li className="app_content-delete">
                            <i className="fa fa-bullhorn"/> Signaler
                        </li>
                        <li className="app_content-delete">
                            <i className="fa fa-times-circle"/> Bloquer
                        </li>
                    </ul>
                </OptionsWrapper>
            </h3>
        </div>
    )
}

export default UserPreview;