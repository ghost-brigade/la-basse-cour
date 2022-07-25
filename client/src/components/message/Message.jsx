import { useEffect } from "react";
import { useState } from "react";
import OptionsWrapper from "../wrappers/OptionsWrapper";
import MessageUser from "./MessageUser";

const transformDatetoStr = (date) => {
    if (!date instanceof Date) {
        return date;
    }

    // get difference between current date and message date
    const diff = new Date() - date;
    const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        const diffHours = Math.round(diff / (1000 * 60 * 60));
        const diffMinutes = Math.round(diff / (1000 * 60));
        if (diffHours <= 1 && diffMinutes < 60) {
            return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
        }

        return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    }
    if (diffDays === 1) {
        return 'Hier';
    }

    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = date.getFullYear();
    let hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const Message = (props) => {
    const {user, ...message} = props;

    const handleSetEditMode = () => {
        props.handleSetEditMode(message);
    }
    
    const toggleDeleteMessage = async () => {
        props.handleDeleteMessage(message);
    }

    return (
        <div className={['app_message', (message.isCurrentUserMessage ? 'currentUserMessage' : ''), (message.deletedAt !== null ? 'deleted' : '')].join(' ')}>
            <header>
                <MessageUser {...user} isCurrentUserMessage={message.isCurrentUserMessage}/>
                {
                    message.isCurrentUserMessage
                        ? <OptionsWrapper>
                            <ul>
                                {
                                    message.deletedAt !== null 
                                    ? <li onClick={toggleDeleteMessage}>
                                        <i className="fa fa-check"/> Remettre
                                    </li>
                                    : <>
                                        <li onClick={handleSetEditMode}>
                                            <i className="fa fa-edit"/> Modifier
                                        </li>
                                        <li className="app_content-delete" onClick={toggleDeleteMessage}>
                                            <i className="fa fa-trash"/> Supprimer
                                        </li>
                                    </>
                                }
                            </ul>
                        </OptionsWrapper>
                        : ''
                }
            </header>
            <div className="app_message-content">{message.deletedAt !== null ? 'Message supprimé' : message.text}</div>
            <footer className="app_message-date">{transformDatetoStr(message.createdAt)}</footer>
        </div>
    )
}

export default Message;