import { useState } from 'react';
import CurrentUserContext from '../../contexts/user/CurrentUserContext';
import { getUser } from '../../utils/user_management';

const AppProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(getUser(1));

    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            {props.children}
        </CurrentUserContext.Provider>
    )
}

export default AppProvider;