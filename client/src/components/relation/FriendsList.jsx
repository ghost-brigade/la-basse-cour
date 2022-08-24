import { useEffect, useState } from "react";
import UserPreview from "../user/UserPreview";
import FriendsAddButton from "./FriendsAddButton";

const FriendsList = (props) => {
    const [friendList, setFriendList] = useState(props.friends.filter(friendShip => friendShip.status === props.status));

    const handleValidatePending = async (friendShip) => {
        props.handleChangeStatusFriendship(friendShip, 'accepted');
    }
    
    const handleRejectPending = async (friendShip) => {
        props.handleChangeStatusFriendship(friendShip, 'rejected');
    }

    const handleCancelFriendShip = async (friendShip) => {
        props.handleCancelFriendShip(friendShip);
    }

    const handleBlockFriendShip = async (user) => {
        if (props.handleBlockFriendShip) {
            props.handleBlockFriendShip(user);
        }
    }

    const handleUnblockFriendShip = async (user) => {
        if (props.handleUnblockFriendShip) {
            props.handleUnblockFriendShip(user);
        }
    }

    useEffect(() => {
        setFriendList(props.friends.filter(friendShip => friendShip.status === props.status));
    }, [props.friends]);

    if (!friendList.length && props.status !== 'accepted') {
        return <></>;
    }

    return (
        <>
            <h2 className="app_title-button">
                {props.title}
                {
                    props.status === 'accepted'
                        ? <FriendsAddButton/>
                        : ''
                }
            </h2>
            <section className="app_friends-list">
                {
                    friendList.length 
                    ? friendList.map((friendShip) => <UserPreview 
                        status={friendShip.status}
                        key={friendShip.friend.id} 
                        user={friendShip.friend}
                        handleBlockUser={handleBlockFriendShip}
                        handleUnblockUser={handleUnblockFriendShip}
                    >
                        {
                            ['pending'].includes(props.status)
                            ? <>
                                {
                                    friendShip.addressee
                                    ? <div onClick={() => handleValidatePending(friendShip)}>
                                        <i className="fa fa-check icon_rounded app_success"/>
                                    </div>
                                    : ''
                                }
                                <div onClick={() => friendShip.addressee ? handleRejectPending(friendShip) : handleCancelFriendShip(friendShip)}>
                                    <i className="fa fa-close icon_rounded app_danger"/>
                                </div>
                            </>
                            : ''
                        }
                    </UserPreview>
                    )
                    : <p style={{margin: 'auto', fontStyle: 'italic'}}>Vous n'avez pas encore d'amis, ajoutez-en facilement en cliquant sur le bouton "+" ci-dessus.</p>
                }
            </section>
        </>
    )
}

FriendsList.defaultProps = {
    status: 'accepted',
    title: 'Liste de mes amis'
}

export default FriendsList;