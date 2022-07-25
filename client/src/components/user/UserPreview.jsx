import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DiscussionContext from "../../contexts/discussion/DiscussionContext";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getPrivateDiscussion } from "../../utils/discussion_management";
import { blockUser, unblockUser } from "../../utils/relation_management";
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

    const handleBlockUser = async () => {
        const blocked = await blockUser(user.id);

        if (blocked && props.handleBlockUser) {
            props.handleBlockUser(user);
        }
    }

    const handleUnblockUser = async () => {
        const unblocked = await unblockUser(user.id);

        if (unblocked && props.handleUnblockUser) {
            props.handleUnblockUser(user);
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
                        {
                            props.status === 'blocked'
                            ? <li onClick={handleUnblockUser}>
                                <i className="fa fa-check"/> Débloquer
                            </li>
                            : <li className="app_content-delete" onClick={handleBlockUser}>
                                <i className="fa fa-times-circle"/> Bloquer
                            </li>
                        }
                        
                    </ul>
                </OptionsWrapper>
            </h3>
        </div>
    )
}

export default UserPreview;