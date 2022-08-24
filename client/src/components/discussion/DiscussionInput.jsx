import { useState } from "react";
import DiscussionEmojiSelector from "./DiscussionEmojiSelector";
import TextareaAutosize from 'react-textarea-autosize';

const DiscussionInput = (props) => {
    const sendFunction = () => {
        if (props.editingMessage) {
            props.editMessageFunction();
        } else {
            props.sendMessageFunction();
        }
    }

    const handleKeyPress = event => {
        if (event.key === 'Enter') {
            sendFunction();
        }
    }
    
    const handleChange = event => {
        props.setMessage(event.target.value.replace('\n', ''));
    }

    const handleAddEmoji = emoji => {
        props.setMessage(props.message + emoji);
    }

    return (
        <>
            <div className="app_input-icon app_input-double-icon">
                <DiscussionEmojiSelector
                    handleClick={handleAddEmoji}
                />
                <TextareaAutosize 
                    value={props.message}
                    type="text" 
                    placeholder="Message"
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                />
                {
                    props.editingMessage
                    ?   <i 
                        className="fa fa-cancel" 
                    />
                    : ''
                }
                <i 
                    className="fa fa-send" 
                    onClick={sendFunction}
                />
            </div>
        </>
    );
}

export default DiscussionInput;