import { useContext, useEffect, useState } from "react";
import { createDiscussion } from "../../utils/discussion_management";
import SendButton from "../form/SendButton";
import UserInterests from "../user/UserInterests";
import UserSelector from "../user/UserSelector";
import { getFriendsList } from "../../utils/relation_management";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import DiscussionContext from "../../contexts/discussion/DiscussionContext";

const DiccusionCreate = (props) => {
    const navigate = useNavigate();
    const {currentUser} = useContext(CurrentUserContext);
    const {setSelectedDiscussion} = useContext(DiscussionContext);
    const [friends, setFriends] = useState([]);
    const [values, setValues] = useState({
        'label': '',
        'technologies': [],
        'users': [],
    });
    const [nbEdit, setNbEdit] = useState(0);
    const [isPublic, setIsPublic] = useState(false);

    useEffect(() => {
        connectFriends();
    }, []);

    const connectFriends = async () => {
        const friends = await getFriendsList(currentUser.id);
        setFriends(friends.filter(friend => friend.status === 'accepted'));
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const handleAddUser = (userId) => {
        const discussion = values;
        if (!discussion.users.includes(userId)) {
            discussion.users.push(userId);
        }
        setValues(discussion);
        setNbEdit(nbEdit + 1);
    }
    
    const handleRemoveUser = (userId) =>{
        const discussion = values;
        discussion.users = discussion.users.filter(user => user !== userId);
        console.log(discussion);
        setValues(discussion);
        setNbEdit(nbEdit + 1);
    }

    const handleAddInterest = (interest) => {
        const discussion = values;
        if (!discussion.technologies.includes(interest)) {
            discussion.technologies.push(interest);
        }
        setValues(discussion);
        setNbEdit(nbEdit + 1);
    }
    
    const handleRemoveInterest = (interest) =>{
        const discussion = values;
        discussion.technologies = discussion.technologies.filter(technology => technology !== interest);
        setValues(discussion);
        setNbEdit(nbEdit + 1);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        values.themes = values.technologies;
        values.users = [...values.users, currentUser.id];
        const discussionCreated = await createDiscussion(values);
        if (discussionCreated) {
            setSelectedDiscussion(discussionCreated);
            navigate('/discussions/');
        }        
    }

    return (
        <form onSubmit={handleSubmit} className="app_discussion-create">
            <div className="form-group">
                <label htmlFor="label">Label</label>
                <input type="text" className="form-control" id="label" name="label" value={values.label} onChange={handleChange} />
            </div>
            <UserSelector
                title={'Utilisateurs sélectionnés'}
                usersList={friends.map(friendship => friendship.friend)}
                selectedUsers={values.users}
                handleAddUser={handleAddUser}
                handleRemoveUser={handleRemoveUser}
            />
            <div className="custom-control custom-switch mb-3">
                <input 
                    type="checkbox" 
                    className="custom-control-input" 
                    id="sendEmail_switch" 
                    checked={isPublic} 
                    onChange={() => setIsPublic(!isPublic)}
                />
                <label className="custom-control-label" htmlFor="sendEmail_switch">Rendre cette discussion publique</label>
            </div>
            {
                isPublic
                ? <>
                    <UserInterests
                        title={'Thèmes sélectionnés'}
                        selectionTitle={'Sélectionner des thèmes supplémentaires'}
                        user={values}
                        handleAddInterest={handleAddInterest}
                        handleRemoveInterest={handleRemoveInterest}
                    />
                    {
                        values.technologies.length > 0
                        ? ''
                        : <p className="mb-3">
                            <i>La sélection d'au moins 1 thème est obligatoire pour une discussion publique</i>
                        </p>
                    }
                </>
                : ''
            }
            <SendButton />
        </form>
    )
}

export default DiccusionCreate;