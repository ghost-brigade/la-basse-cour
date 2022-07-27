import { useEffect, useState } from "react";
import FriendsList from "../components/relation/FriendsList";
import { changeStatusFriendship, getFriendsList, toggleFriendship } from "../utils/relation_management";

const RelationsPage = (props) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        initFriends();
    }, []);

    const initFriends = async () => {
        const userFriends = await getFriendsList();
        setFriends(userFriends);
    };

    const handleChangeStatusFriendship = async (friendShip, status) => {
        const friendshipUpdated = await changeStatusFriendship(friendShip.friend.id, status);
        friendshipUpdated.status = status;
        const friendsFiltered = friends.map(friend => {
            if (friend.id !== friendshipUpdated.id) {
                return friend;
            }
            return friendshipUpdated;
        });
        setFriends(friendsFiltered);
    }

    const handleCancelFriendShip = async (friendShip) => {
        const canceled = await toggleFriendship(friendShip.friend.id);
        const friendsFiltered = friends.filter(friend => friend.id !== friendShip.id);
        setFriends(friendsFiltered);
    }

    const handleBlockFriendShip = (user) => {
        setFriends(friends.map(friend => {
            if (friend.friend.id !== user.id) {
                return friend;
            }
            friend.status = 'blocked';
            return friend;
        }));
    }

    const handleUnblockFriendShip = (user) => {
        setFriends(friends.filter(friend => friend.friend.id !== user.id));
    }

    return (
        <>
            <FriendsList 
                friends={friends}
                handleBlockFriendShip={handleBlockFriendShip}
                handleUnblockFriendShip={handleUnblockFriendShip}
            />
            <FriendsList 
                friends={friends} 
                status='pending' 
                title='Mes demandes en attente' 
                handleChangeStatusFriendship={handleChangeStatusFriendship} 
                handleCancelFriendShip={handleCancelFriendShip}
                handleBlockFriendShip={handleBlockFriendShip}
                handleUnblockFriendShip={handleUnblockFriendShip}
            />
            <FriendsList 
                friends={friends} 
                status='rejected' 
                title='Mes demandes rejettées'
                handleBlockFriendShip={handleBlockFriendShip}
                handleUnblockFriendShip={handleUnblockFriendShip}
            />
            <FriendsList 
                friends={friends} 
                status='blocked' 
                title='Mes demandes bloquées'
                handleBlockFriendShip={handleBlockFriendShip}
                handleUnblockFriendShip={handleUnblockFriendShip}
            />
        </>
    );
}

export default RelationsPage;