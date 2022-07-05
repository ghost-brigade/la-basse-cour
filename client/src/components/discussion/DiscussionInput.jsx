import { useState } from "react";
import DiscussionEmojiSelector from "./DiscussionEmojiSelector";
import TextareaAutosize from 'react-textarea-autosize';

const DiscussionInput = (props) => {
    const [message, setMessage] = useState('');

    const sendFunction = () => {
        props.sendMessageFunction(message);
        setMessage('');
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            props.sendMessageFunction(message);
            setMessage('');
        }
    }
    
    const handleChange = event => {
        setMessage(event.target.value.replace('\n', ''));
    }

    const handleAddEmoji = emoji => {
        setMessage(message + emoji);
    }

    return (
        <>
            <div className="app_input-icon app_input-double-icon">
                <DiscussionEmojiSelector
                    handleClick={handleAddEmoji}
                />
                <TextareaAutosize 
                    value={message}
                    type="text" 
                    placeholder="Message"
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                />
                <i 
                    className="fa fa-send" 
                    onClick={sendFunction}
                />
            </div>
        </>
    );
}

export default DiscussionInput;