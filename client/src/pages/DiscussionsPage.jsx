import { useEffect } from 'react';
import { useContext, useState } from 'react';
import Discussion from '../components/discussion/Discussion';
import DiscussionAddButton from '../components/discussion/DiscussionAddButton';
import DiscussionPreview from '../components/discussion/DiscussionPreview';
import DiscussionContext from '../contexts/discussion/DiscussionContext';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import { getDiscussions, leaveDiscussion } from '../utils/discussion_management';
import { sendMessage, updateMessage, toggleDeleteMessage, messageFormatter } from '../utils/message_management';
import * as socketManagement from '../utils/socket_management.js';
import { userFormatter } from '../utils/user_management';

const socket = socketManagement.init();

const DiscussionsPage = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const {selectedDiscussion, setSelectedDiscussion} = useContext(DiscussionContext);
    const [nbMessagesSent, setNbMessagesSent] = useState(0);
    const [discussions, setDiscussions] = useState([]);
    const [editingMessage, setEditingMessage] = useState(null);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [socketMessages, setSocketMessages] = useState([]);
    const [socketUpdatedMessages, setSocketUpdatedMessages] = useState([]);

    useEffect(() => {
        connectDiscussion();

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('message', (message) => {
            addSocketMessage(message);
        });

        socket.on('message.update', (message) => {
            updateSocketMessage(message);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('message');
            socket.off('message.update');
        };
    }, []);

    const addSocketMessage = (message) => {
        const formattedMessage = messageFormatter(message);
        if (message.user.id !== currentUser.id) {
            formattedMessage.user = formattedMessage.user.id;
            setSocketMessages([...socketMessages, formattedMessage]);
        }
    }

    const updateSocketMessage = (message) => {
        const formattedMessage = messageFormatter(message);
        if (message.user.id !== currentUser.id) {
            setSocketUpdatedMessages([...socketUpdatedMessages, formattedMessage]);
        }
    }

    useEffect(() => {
        if (selectedDiscussion && socketMessages.length) {
            const updatedSelectedDiscussion = selectedDiscussion;
            updatedSelectedDiscussion.messages.push(...socketMessages);
            setSelectedDiscussion(updatedSelectedDiscussion);
            setSocketMessages([]);
        }
    }, [socketMessages]);

    useEffect(() => {
        if (selectedDiscussion && socketUpdatedMessages.length) {
            const updatedSelectedDiscussion = selectedDiscussion;
            updatedSelectedDiscussion.messages = updatedSelectedDiscussion.messages.map(message => {
                for (let index in socketUpdatedMessages) {
                    if (socketUpdatedMessages[index].id === message.id) {
                        return socketUpdatedMessages[index];
                    }
                }

                return message;
            });
            setSelectedDiscussion(updatedSelectedDiscussion);
            setSocketUpdatedMessages([]);
        }
    }, [socketUpdatedMessages]);

    useEffect(() => {
        if (selectedDiscussion && isConnected) {
            socket.emit('join', selectedDiscussion.id, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            //console.log('join discussion ' + selectedDiscussion.id);
        }

        return () => {
            socket.off('join');
        }
    }, [selectedDiscussion]);

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
            messageReturned.user = messageReturned.user.id;
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
        //console.log(leaved);
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
                ? <h2 className='app_title-button' onClick={unselectDiscussion}>
                    <span><i className='app_return-button fa fa-chevron-left'/> Liste des discussions</span>
                    <DiscussionAddButton/>
                </h2>
                : <h2 className='app_title-button'>
                    Liste des discussions
                    <DiscussionAddButton/>
                </h2>
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