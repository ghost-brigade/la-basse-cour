import { useContext } from "react";
import { useState } from "react";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import Message from "../message/Message";
import DiscussionInput from "./DiscussionInput";

const Discussion = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    //const [nbMessages, setNbMessages] = useState(0);
    const {messages, users}= props.discussion;

    const sendMessageFunction = (message) => {
        if (!message.length) {
            return;
        }
        
        props.handleSendMessage(message);
    }

    return (
        <div className="app_discussion">
            <div className="app_discussion-messages">
                {
                    messages && messages.length
                        ? messages
                            .sort((a,b) => b.date - a.date)
                            .map(message => <Message
                                {...message}
                                isCurrentUserMessage={message.user === currentUser.id}
                                user={users.find(user => user.id === message.user)}
                            />)
                        : <span class="app_discussion-no-message">Aucune message pour l'instant</span>
                }
            </div>
            <DiscussionInput 
                sendMessageFunction={sendMessageFunction}
            />
        </div>
    );
}

export default Discussion;