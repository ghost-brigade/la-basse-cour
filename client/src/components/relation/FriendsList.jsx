import { useState } from "react";
import { toggleFriendship } from "../../utils/relation_management";
import UserPreview from "../user/UserPreview";
import FriendsAddButton from "./FriendsAddButton";

const FriendsList = (props) => {
    const friendList = props.friends.filter(friendShip => friendShip.status === props.status);

    const handleValidatePending = async (friendShip) => {
        props.handleChangeStatusFriendship(friendShip, 'accepted');
    }
    
    const handleRejectPending = async (friendShip) => {
        props.handleChangeStatusFriendship(friendShip, 'rejected');
    }

    const handleCancelFriendShip = async (friendShip) => {
        props.handleCancelFriendShip(friendShip);
    }

    if (!friendList.length) {
        return <></>;
    }

    return (
        <>
            <h2 className="app_title-button">
                {props.title}
                <FriendsAddButton/>
            </h2>
            <section className="app_friends-list">
                {friendList.map((friendShip) => <UserPreview key={friendShip.friend.id} user={friendShip.friend}>
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
                            <div onClick={() => friendShip.addressee ? handleCancelFriendShip(friendShip) : handleRejectPending(friendShip)}>
                                <i className="fa fa-close icon_rounded app_danger"/>
                            </div>
                        </>
                        : ''
                    }
                </UserPreview>
                )}
            </section>
        </>
    )
}

FriendsList.defaultProps = {
    status: 'accepted',
    title: 'Liste de mes amis'
}

export default FriendsList;