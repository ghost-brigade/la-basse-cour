import { useEffect, useState } from "react";
import { getFriendsList } from "../../utils/relation_management";
import UserPreview from "../user/UserPreview";
import FriendsAddButton from "./FriendsAddButton";

const FriendsList = (props) => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        initFriends();
    }, []);

    const initFriends = async () => {
        const userFriends = await getFriendsList(props.user);
        setFriends(userFriends);
    };

    return (
        <>
            <h2 className="app_title-button">
                Liste de mes amis 
                <FriendsAddButton/>
            </h2>
            <section className="app_friends-list">
                {friends.map((friend) => <UserPreview user={friend}/>)}
            </section>
        </>
    )
}

export default FriendsList;