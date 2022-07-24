import { useEffect } from 'react';
import { useContext, useState } from 'react';
import Discussion from '../components/discussion/Discussion';
import DiscussionPreview from '../components/discussion/DiscussionPreview';
import DiscussionContext from '../contexts/discussion/DiscussionContext';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import { getDiscussions, leaveDiscussion } from '../utils/discussion_management';
import { sendMessage, updateMessage, toggleDeleteMessage } from '../utils/message_management';

const DiscussionsPage = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const {selectedDiscussion, setSelectedDiscussion} = useContext(DiscussionContext);
    const [nbMessagesSent, setNbMessagesSent] = useState(0);
    const [discussions, setDiscussions] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);

    useEffect(() => {
        connectDiscussion();
    }, []);

    const connectDiscussion = async () => {
        const discussionsFound = await getDiscussions();
        if (discussionsFound && discussionsFound.length) {
            setDiscussions(discussionsFound);
        }
    }

    const handleDiscussionClick = (discussion) => {
        if (!selectedDiscussion || selectedDiscussion.id !== discussion.id) {
            setSelectedDiscussion(discussion);
        }
    }

    const unselectDiscussion = () => {
        setSelectedDiscussion(null);
    }

    const handleSendMessage = async (messageText) => {
        if (!messageText.length) {
            return;
        }

        const messageReturned = await sendMessage(selectedDiscussion.id, currentUser.id, messageText);
        if (messageReturned) {
            const discussionToUpdate = selectedDiscussion;
            discussionToUpdate.messages.push(messageReturned);
            setSelectedDiscussion(discussionToUpdate);
            setNbMessagesSent(nbMessagesSent + 1);
        }
    }

    const handleRefreshMessages = (messages) => {
        setSelectedDiscussion({
            ...selectedDiscussion,
            'messages': messages
        });
    }

    const handleLeaveDiscussion = async (discussion) => {
        const leaved = await leaveDiscussion(discussion.id);
        console.log(leaved);
        const discussionNotLeaved = discussions.filter(disc => disc.id !== discussion.id);
        setDiscussions(discussionNotLeaved);
    }

    const handleDeleteMessage = async (message) => {
        const returnedMessage = await toggleDeleteMessage(message);
        
        const selectedDiscussionUpdated = selectedDiscussion;
        selectedDiscussionUpdated.messages = selectedDiscussion.messages.map(message => {
            if (message.id !== returnedMessage.id) {
                return message;
            }
            return returnedMessage;
        });
        
        setSelectedDiscussion(selectedDiscussionUpdated);
        setNbMessagesSent(nbMessagesSent + 1);
    }

    const handleEditMessage = async (messageText) => {
        if (!messageText.length) {
            return;
        }

        editingMessage.text = messageText;
        
        const returnedMessage = await updateMessage(editingMessage);
        console.log(returnedMessage);
        const selectedDiscussionUpdated = selectedDiscussion;
        selectedDiscussionUpdated.messages = selectedDiscussion.messages.map(message => {
            if (message.id !== returnedMessage.id) {
                return message;
            }
            return returnedMessage;
        });
        
        setSelectedDiscussion(selectedDiscussionUpdated);
        setEditingMessage(null);
        setNbMessagesSent(nbMessagesSent + 1);
    }

    return (
        <div className='app_discussions-page'>
            {selectedDiscussion 
                ? <h2 onClick={unselectDiscussion}>
                    <span ><i className='app_return-button fa fa-chevron-left'/> </span>
                    Liste des discussions
                </h2>
                : <h2>Liste des discussions</h2>
            }
            <div className='app_discussions'>
                <section className={`app_discussions-list ${selectedDiscussion ? 'elementSelected': ''}`}>
                    {
                        discussions.length 
                        ? discussions.map(
                            discussion => <DiscussionPreview 
                                key={discussion.id}
                                discussion={discussion}
                                handleDiscussionClick={handleDiscussionClick}
                                handleLeaveDiscussion={handleLeaveDiscussion}
                                selected={selectedDiscussion && selectedDiscussion.id === discussion.id} 
                            />
                        )
                        : 'Aucune discussion n\'est en cours'
                    }
                </section>
                {
                    selectedDiscussion
                    ? <Discussion 
                        discussion={selectedDiscussion}
                        handleRefreshMessages={handleRefreshMessages}
                        handleSendMessage={handleSendMessage}
                        handleDeleteMessage={handleDeleteMessage}
                        editingMessage={editingMessage} 
                        setEditingMessage={setEditingMessage}
                        handleEditMessage={handleEditMessage}
                    />
                    : ''
                }
            </div>
        </div>
    );
}

export default DiscussionsPage;