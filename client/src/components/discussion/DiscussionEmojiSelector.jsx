import { useState } from 'react';
import icon_emoji from '../../assets/images/icon_emoji.png';
import DetectCloseWrapper from '../wrappers/DetectCloseWrapper';

const emojis = ['🙂', '😇', '😥', '👍', '👎', '🖕', '🤬'];
const DiscussionEmojiSelector = (props) => {
    const [classPopup, setClassPopup] = useState('hidden');

    const handleAddEmoji = event => {
        props.handleClick(event.target.innerHTML);
    }

    const togglePopup = event => {
        setClassPopup(classPopup ? '' : 'hidden');
    }

    return (
        <DetectCloseWrapper 
            closeFunction={() => setClassPopup('hidden')}
            className='app_discussion-emoji-selector'
        >
            <div className={'app_popup app_discussion-emoji-selector-popup ' + classPopup}>
                {emojis.map(emoji => <span className='emoji' onClick={handleAddEmoji}>{emoji}</span>)}
            </div>
            <img src={icon_emoji} className='icon' onClick={togglePopup}/>
        </DetectCloseWrapper>
    );
}

export default DiscussionEmojiSelector;