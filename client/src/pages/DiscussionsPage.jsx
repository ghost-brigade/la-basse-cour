import { useContext, useState } from 'react';
import Discussion from '../components/discussion/Discussion';
import DiscussionPreview from '../components/discussion/DiscussionPreview';
import CurrentUserContext from '../contexts/user/CurrentUserContext';
import { getDiscussionById, getDiscussions, postMessage } from '../utils/discussion_management';

const DiscussionsPage = (props) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [nbMessagesSent, setNbMessagesSent] = useState(0);
    const [discussions, setDiscussions] = useState(getDiscussions(currentUser));
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    const handleDiscussionClick = (id) => {
        setSelectedDiscussion(getDiscussionById(currentUser, id));
    }

    const unselectDiscussion = () => {
        setSelectedDiscussion(null);
    }

    const handleSendMessage = (messageText) => {
        const message = {
            'id': 1234, 
            'discussion': selectedDiscussion.id,
            'text': messageText, 
            'user': currentUser.id, 
            'date': new Date()
        }

        const messageReturned = postMessage(message);
        if (messageReturned) {
            const discussionToUpdate = selectedDiscussion;
            discussionToUpdate.messages.push(messageReturned);
            setSelectedDiscussion(discussionToUpdate);
            setNbMessagesSent(nbMessagesSent + 1);
        }
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
                                {...discussion}
                                handleDiscussionClick={handleDiscussionClick}
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
                        handleSendMessage={handleSendMessage}
                    />
                    : ''
                }
            </div>
        </div>
    );
}

export default DiscussionsPage;