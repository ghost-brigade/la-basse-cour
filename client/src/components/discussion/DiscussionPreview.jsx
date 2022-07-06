import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CurrentUserContext from '../../contexts/user/CurrentUserContext';
import { getDiscussionTitle } from '../../utils/discussion_management';
import OptionsWrapper from '../wrappers/OptionsWrapper';

const DiscussionPreview = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const {discussion, selected} = props;

    const handleDiscussionClick = (id) => {
        props.handleDiscussionClick(id);
    }

    return (
        <div 
            onClick={() => handleDiscussionClick(discussion.id)}
            className={`app_card app_card-colored app_discussion-preview ${selected ? 'selected': ''}`}
        >
            {getDiscussionTitle(discussion, currentUser)}
            <OptionsWrapper>
                <ul>
                    <li>
                        <i className="fa fa-edit"/> Quitter
                    </li>
                    <li className="app_content-delete">
                        <i className="fa fa-trash"/> Supprimer
                    </li>
                </ul>
            </OptionsWrapper>
        </div>
    )
}

export default DiscussionPreview;