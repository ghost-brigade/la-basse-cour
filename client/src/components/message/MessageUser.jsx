const MessageUser = (props) => {
    const {isCurrentUserMessage, firstname, lastname, img} = props;
    
    return (
        <div className="app_message-user">
            {
                isCurrentUserMessage
                ? 'Moi'
                : <>
                    <img src={img} alt='' className="app_message-user-img"/> {firstname} {lastname}
                </>
            }
        </div>
    );
}

export default MessageUser;