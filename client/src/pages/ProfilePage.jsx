import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { updateUser } from "../utils/user_management";
import SendButton from "../components/form/SendButton";
import UserProfileSelector from "../components/user/UserProfileSelector";
import UserInformations from "../components/user/UserInformations";
import DisconnectButton from "../components/user/DisconnectButton";

const ProfilePage = (props) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [userEdited, setUserEdited] = useState(currentUser);
    const [isEditing, setIsEditing] = useState(true);

    const handleChangeData = (event) => {
        const key = event.target.id;
        const value = event.target.value;
        setUserEdited({
            ...userEdited, 
            [key]: value
        });
    }

    const handleChangeImage = (profileImage) => {
        setUserEdited({
            ...userEdited, 
            ['img']: profileImage
        });
    }

    const handleSubmit = event => {
        event.preventDefault();
        
        const userReturned = updateUser(userEdited);
        if (userReturned) {
            setCurrentUser(userReturned);
        }
    }

    const handleDisconnect = () => {
        localStorage.clear('token');
        setCurrentUser(null);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <UserProfileSelector
                    isEditing={isEditing} 
                    actualImg={userEdited.img}
                    handleChange={handleChangeImage}
                />
                <div className="my-2">
                    {isEditing ? 'Modifier mes informations ': 'Informations'}
                    <UserInformations 
                        user={userEdited} 
                        isEditing={isEditing} 
                        handleChange={handleChangeData}
                    />
                </div>
                <div className="app_buttons-container" style={{justifyContent: 'space-between'}}>
                    <SendButton/>
                    <DisconnectButton/>
                </div>
            </form>
        </>
    );
}

export default ProfilePage;