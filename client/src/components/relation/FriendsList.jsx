import { useState } from "react";
import { getFriendsList } from "../../utils/relation_management";
import UserPreview from "../user/UserPreview";
import FriendsAddButton from "./FriendsAddButton";

const FriendsList = (props) => {
    const [friends, setFriends] = useState(
        getFriendsList(props.user)
    );

    console.log(friends);

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