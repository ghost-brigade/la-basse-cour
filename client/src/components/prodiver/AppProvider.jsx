import { useEffect } from 'react';
import { useState } from 'react';
import DiscussionContext from '../../contexts/discussion/DiscussionContext';
import CurrentUserContext from '../../contexts/user/CurrentUserContext';
import { getUserToken, loginFromToken } from '../../utils/user_management';

const AppProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);

    useEffect(() => {
        const tokenStored = getUserToken();
        if (tokenStored) {
            handleConnect(tokenStored);
        }
    }, []);

    const handleConnect = async (token) => {
        const user = await loginFromToken(token);
        if (user) {
            setCurrentUser(user);
        }
    }

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <DiscussionContext.Provider value={{selectedDiscussion, setSelectedDiscussion}}>
                {props.children}
            </DiscussionContext.Provider>
        </CurrentUserContext.Provider>
    )
}

export default AppProvider;