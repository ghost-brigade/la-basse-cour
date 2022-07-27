import { useState } from "react";
import { getAllProfileImages } from "../../utils/user_management";

const UserProfileSelector = (props) => {
    const {isEditing, actualImg} = props;

    const allProfileImages = getAllProfileImages();

    const handleChange = (profileImage) => {
        props.handleChange(profileImage);
    }

    return (
        <div>
            <h2 className="mb-2">Image de profil</h2>
            <div className="app_user-profile-selector">
                <img className="actual" src={actualImg.img} alt='actual_profile_img'/>
                {
                    isEditing
                    ? <div className="app_user-profile-selector-choices">
                        {allProfileImages
                            .map(profileImage => <div key={`img_container_${profileImage.id}`} className={profileImage.id === actualImg.id ? 'selected' : ''}>
                                <img src={profileImage.img} onClick={() => handleChange(profileImage)}/>
                            </div>)}
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}

export default UserProfileSelector;