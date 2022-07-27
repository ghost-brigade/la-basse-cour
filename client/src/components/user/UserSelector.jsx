import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/user/CurrentUserContext";
import { getUserTitle } from "../../utils/user_management";

const UserSelector = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const [nbSelection, setNbSelection] = useState(0);

    const handleChange = (event) => {
        const { value } = event.target;
        props.handleAddUser(value);
        setNbSelection(nbSelection + 1);
    }

    const handleRemoveUser = (userId) => {
        props.handleRemoveUser(userId);
        setNbSelection(nbSelection - 1);
    }

    return (
        <div className="app_user-selector">
            <p>{props.title}</p>
            <div className="app_selecting-list">
                <div className={`app_selecting-list-element`}
                        ><img src={currentUser.img} alt=''/> Moi </div>
                {props.selectedUsers.map(userId => {
                    const selectedUser = props.usersList.find(user => user.id === userId);
                    return (
                        <div 
                            key={`user_selected_${userId}`} 
                            id={userId}
                            className={`app_selecting-list-element`}
                        ><img src={selectedUser.img} alt=''/> {getUserTitle(selectedUser)} <i 
                                className="fa fa-close icon_rounded app_danger" 
                                onClick={() => handleRemoveUser(userId)}
                            />
                        </div>
                    )
                })}
            </div>
            <div className="form-group">
                <label htmlFor="users">Choisir des utilisateurs à ajouter</label>
                <select className="form-control" id="users" name='users' onChange={handleChange}>
                    <option>Sélectionnez des amis</option>
                    {props.usersList.filter(
                        user => user.id !== currentUser.id 
                        && !props.selectedUsers.includes(user.id)
                    )
                    .map(user => <option key={`user_selector_${user.id}`} value={user.id}>
                        {user.firstname} {user.lastname}
                    </option>)}
                </select>
            </div>
        </div>
    );
}

export default UserSelector;