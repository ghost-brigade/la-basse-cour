import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DiscussionContext from "../../contexts/discussion/DiscussionContext";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getPrivateDiscussion } from "../../utils/discussion_management";
import { getUserTitle } from "../../utils/user_management";
import OptionsWrapper from "../wrappers/OptionsWrapper";

const UserPreview = (props) => {
    const navigate = useNavigate();
    const {currentUser} = useContext(CurrentUserContext);
    const {setSelectedDiscussion} = useContext(DiscussionContext);
    const {user} = props;
    
    const handleSelectDiscussion = async (userIdSelected) => {
        const discussion = await getPrivateDiscussion(currentUser, userIdSelected);

        if (discussion) {
            setSelectedDiscussion(discussion);
            navigate('/discussions');
        }
    }

    if (!user) {
        return <></>;
    }

    return (
        <div className="app_card app_user-preview">
            <img src={user.img} alt=''/>
            <h3 className="app_title-wrapper">
                <div onClick={() => handleSelectDiscussion(user.id)}>
                    {getUserTitle(user)}
                </div>
                {props.children}
                <OptionsWrapper>
                    <ul>
                        { props.options ? props.options : '' }
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