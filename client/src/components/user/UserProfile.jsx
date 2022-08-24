const UserProfile = (props) => {
    return (
        <>
            <UserProfileSelector
                isEditing={isEditing} 
                actualImg={userEdited}
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
            <SendButton/>
        </>
    )
}