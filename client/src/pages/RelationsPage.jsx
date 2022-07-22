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
        const canceled = await changeStatusFriendship(friendShip.friend.id, status);
        const friendsFiltered = friends.filter(friend => friend.id !== friendShip.id);
        setFriends(friendsFiltered);
    }

    const handleCancelFriendShip = async (friendShip) => {
        const canceled = await toggleFriendship(friendShip.friend.id);
        const friendsFiltered = friends.filter(friend => friend.id !== friendShip.id);
        setFriends(friendsFiltered);
    }

    return (
        <>
            <FriendsList 
                friends={friends}
            />
            <FriendsList 
                friends={friends} 
                status='pending' 
                title='Mes demandes en attente' 
                handleChangeStatusFriendship={handleChangeStatusFriendship} 
                handleCancelFriendShip={handleCancelFriendShip}
            />
            <FriendsList 
                friends={friends} 
                status='rejected' 
                title='Mes demandes rejettées'
            />
            <FriendsList 
                friends={friends} 
                status='blocked' 
                title='Mes demandes bloquées'
            />
        </>
    );
}

export default RelationsPage;