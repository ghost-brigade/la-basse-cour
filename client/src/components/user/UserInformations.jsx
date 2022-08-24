const informations = [
    {id: 'email', type: 'email', label: 'Email', visible: (user, value) => user.email === value, editable: () => true},
    {id: 'firstname', type: 'text', label: 'Prénom', visible: () => true, editable : () => true},
    {id: 'lastname', type: 'text', label: 'Nom', visible: () => true, editable : () => true},
    {id: 'schoolBranch', type: 'text', label: 'Classe', visible: () => true, editable : () => false},
]

const UserInformations = (props) => {
    const {isEditing, user} = props;

    return (
        <>
            {informations
            .filter(info => info.visible(user, user.email))
            .map(info => 
                isEditing
                ? <div key={info.id} className="form-group">
                    <label htmlFor={info.id}>{info.label}</label>
                    <input 
                        type={info.type} 
                        className="form-control" 
                        id={info.id} 
                        value={user[info.id]} 
                        disabled={!isEditing || !info.editable()}
                        onChange={props.handleChange} 
                    />
                </div>
                : <div>{info.label} : {user[info.id]}</div>
            )}
        </>
    );
}

export default UserInformations;