import { Link } from 'react-router-dom';
import OptionsWrapper from '../wrappers/OptionsWrapper';

const DiscussionPreview = (props) => {
    const {id, label, selected} = props;

    const handleDiscussionClick = (id) => {
        props.handleDiscussionClick(id);
    }

    return (
        <div 
            onClick={() => handleDiscussionClick(id)}
            className={`app_card app_card-colored app_discussion-preview ${selected ? 'selected': ''}`}
        >
            <p>{label}</p>
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