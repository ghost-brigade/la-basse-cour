import { useContext } from 'react';
import CurrentUserContext from '../../contexts/user/CurrentUserContext';
import { getDiscussionTitle } from '../../utils/discussion_management';
import OptionsWrapper from '../wrappers/OptionsWrapper';

const DiscussionPreview = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const {discussion, selected} = props;

    const handleDiscussionClick = (discussion) => {
        props.handleDiscussionClick(discussion);
    }

    const handleLeaveDiscussion = () => {
        props.handleLeaveDiscussion(discussion);
    }

    return (
        <div 
            onClick={() => handleDiscussionClick(discussion)}
            className={`app_card app_card-colored app_discussion-preview ${selected ? 'selected': ''}`}
        >
            {getDiscussionTitle(discussion, currentUser)}
            {props.children}
            {
                discussion.users.map(user => user.id).includes(currentUser.id)
                    ? <OptionsWrapper>
                        <ul>
                            <li onClick={handleLeaveDiscussion}>
                                <i className="fa fa-edit"/> Quitter
                            </li>
                        </ul>
                    </OptionsWrapper>
                    : ''
                }
        </div>
    )
}

export default DiscussionPreview;