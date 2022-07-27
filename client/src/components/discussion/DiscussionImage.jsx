import { useContext } from "react";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getUserTitle } from "../../utils/user_management";

const DiscussionImage = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const {id, users} = props.discussion;

    const otherUsers = users.filter(user => user.id && user.id !== currentUser.id);

    return (
        <>
            <div className="app_discussion-image">
                <div className="app_discussion-image-users-count">{users.length}</div>
                {
                    otherUsers && otherUsers.length
                    ? <div className="app_discussion-image-users">
                        {otherUsers
                        .map(user => <div key={`${id}_user_preview_${user.id}`} className="app_discussion-image-user-preview">
                            <img src={user.img}/> {getUserTitle(user)}
                        </div>)}
                    </div>
                    : ''
                }
            </div>
        </>
    )
}

export default DiscussionImage;