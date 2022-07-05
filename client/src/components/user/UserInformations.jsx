import { useContext, useState } from "react";
import SendButton from "../form/SendButton";
import UserProfileSelector from "./UserProfileSelector";

const informations = [
    {id: 'email', type: 'email', label: 'Email', visible: (user, value) => user.email === value},
    {id: 'firstname', type: 'text', label: 'Prénom', visible: () => true},
    {id: 'lastname', type: 'text', label: 'Nom', visible: () => true},
]

const UserInformations = (props) => {
    const {isEditing, user} = props;

    return (
        <>
            {informations.map(info => 
                isEditing
                ? <div key={info.id} className="form-group">
                    <label htmlFor={info.id}>{info.label}</label>
                    <input 
                        type={info.type} 
                        className="form-control" 
                        id={info.id} 
                        value={user[info.id]} 
                        disabled={!isEditing}
                        onChange={props.handleChange} 
                    />
                </div>
                : <div>{info.label} : {user[info.id]}</div>
            )}
        </>
    );
}

export default UserInformations;