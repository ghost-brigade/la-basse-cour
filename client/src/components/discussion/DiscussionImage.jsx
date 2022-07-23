import { useContext } from "react";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getUserTitle } from "../../utils/user_management";

const DiscussionImage = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const {id, users} = props.discussion;

    return (
        <>
            <div className="app_discussion-image">
                <div className="app_discussion-image-users-count">{users.length}</div>
                <div className="app_discussion-image-users">
                    {users.filter(user => user.id !== currentUser.id)
                    .map(user => <div key={`${id}_user_preview_${user.id}`} className="app_discussion-image-user-preview">
                        <img src={user.img}/> {getUserTitle(user)}
                    </div>)}
                </div>
            </div>
        </>
    )
}

export default DiscussionImage;