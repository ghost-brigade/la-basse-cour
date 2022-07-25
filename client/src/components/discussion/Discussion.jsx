import { useEffect, useState } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getMessages } from "../../utils/message_management";
import Message from "../message/Message";
import DiscussionInput from "./DiscussionInput";

const Discussion = (props) => {
    const [messageText, setMessageText] = useState('');
    const {currentUser} = useContext(CurrentUserContext);
    //const [nbMessages, setNbMessages] = useState(0);
    const {messages, users}= props.discussion;

    const sendMessageFunction = () => {
        if (!messageText.length) {
            return;
        }
        
        props.handleSendMessage(messageText);
        setMessageText('');
    }

    useEffect(() => {
        connectMessages(props.discussion.id);
    }, [props.discussion.id]);

    const connectMessages = async (discussionId) => {
        if (discussionId) {
            const messagesFounded = await getMessages(discussionId);
            if (messagesFounded) {
                props.handleRefreshMessages(messagesFounded);
            }
        }
    }

    const handleSetEditMode = (message) => {
        setMessageText(message.text);
        props.setEditingMessage(message);
    }

    const handleEditMessage = () => {
        props.handleEditMessage(messageText);
        setMessageText('');
    }

    return (
        <div className="app_discussion">
            <div className="app_discussion-messages">
                {
                    messages && messages.length
                        ? messages
                            .sort((a,b) => b.createdAt - a.createdAt)
                            .map(message => <Message
                                {...message}
                                key={message.id}
                                isCurrentUserMessage={message.user === currentUser.id}
                                user={users.find(user => user.id === message.user)}
                                handleDeleteMessage={props.handleDeleteMessage}
                                handleSetEditMode={handleSetEditMode}
                            />)
                        : <span className="app_discussion-no-message">Aucune message pour l'instant</span>
                }
            </div>
            <DiscussionInput 
                message={messageText}
                setMessage={setMessageText}
                sendMessageFunction={sendMessageFunction}
                editMessageFunction={handleEditMessage}
                editingMessage={props.editingMessage}
                setEditingMessage={props.setEditingMessage}
            />
        </div>
    );
}

export default Discussion;