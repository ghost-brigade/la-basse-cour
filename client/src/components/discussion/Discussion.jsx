import { useEffect } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getMessages } from "../../utils/message_management";
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

    useEffect(() => {
        connectMessages(props.discussion.id);
    }, [props.discussion.id]);

    const connectMessages = async (discussionId) => {
        if (discussionId) {
            const messagesFounded = await getMessages(discussionId);
            if (messagesFounded) {
                console.log(messagesFounded);
                props.handleRefreshMessages(messagesFounded);
            }
        }
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
                            />)
                        : <span className="app_discussion-no-message">Aucune message pour l'instant</span>
                }
            </div>
            <DiscussionInput 
                sendMessageFunction={sendMessageFunction}
            />
        </div>
    );
}

export default Discussion;