import { useState, useContext } from "react";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { updateUser } from "../utils/user_management";
import SendButton from "../components/form/SendButton";
import UserProfileSelector from "../components/user/UserProfileSelector";
import UserInformations from "../components/user/UserInformations";
import DisconnectButton from "../components/user/DisconnectButton";
import { useEffect } from "react";
import UserInterests from "../components/user/UserInterests";

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const editedValues = {};
        for (const key in userEdited) {
            if (currentUser[key] !== userEdited[key]) {
                editedValues[key] = userEdited[key];
            }
        }

        const user = await updateUser(currentUser, editedValues);
        if (user) {
            setCurrentUser(user);
        }
    }
    
    const handleAddInterest = (interest) => {
        const user = userEdited;
        if (!user.technologies.includes(interest)) {
            user.technologies.push(interest);
        }
        setUserEdited(user);
    }
    
    const handleRemoveInterest = (interest) =>{
        const user = userEdited;
        user.technologies = user.technologies.filter(technology => technology !== interest);
        setUserEdited(user);
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
                    <p>{isEditing ? 'Modifier mes informations ': 'Informations'}</p>
                    <UserInformations 
                        user={userEdited} 
                        isEditing={isEditing} 
                        handleChange={handleChangeData}
                    />
                </div>
                <UserInterests 
                    user={userEdited} 
                    handleAddInterest={handleAddInterest}
                    handleRemoveInterest={handleRemoveInterest}
                />
                <div className="app_buttons-container" style={{justifyContent: 'space-between'}}>
                    <SendButton/>
                    <DisconnectButton/>
                </div>
            </form>
        </>
    );
}

export default ProfilePage;