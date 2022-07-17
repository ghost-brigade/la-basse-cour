import { useState } from 'react';
import DiscussionContext from '../../contexts/discussion/DiscussionContext';
import CurrentUserContext from '../../contexts/user/CurrentUserContext';
import { getUser } from '../../utils/user_management';

const AppProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(getUser(1));
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <DiscussionContext.Provider value={{selectedDiscussion, setSelectedDiscussion}}>
                {props.children}
            </DiscussionContext.Provider>
        </CurrentUserContext.Provider>
    )
}

export default AppProvider;