const MessageUser = (props) => {
    const {isCurrentUserMessage, firstname, lastname, img} = props;

    return (
        <div className="app_message-user">
            {
                isCurrentUserMessage
                ? 'Moi'
                : firstname && lastname
                    ? <>
                        <img src={img} alt='' className="app_message-user-img"/> {firstname} {lastname}
                    </>
                    : 'Utilisateur inconnu'
            }
        </div>
    );
}

export default MessageUser;