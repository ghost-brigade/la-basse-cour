import { useContext } from "react";
import FriendsList from "../components/relation/FriendsList";
import CurrentUserContext from "../contexts/user/CurrentUserContext";

const RelationsPage = (props) => {
    const {currentUser} = useContext(CurrentUserContext);

    return (
        <>
            <FriendsList user={currentUser}/>
        </>
    );
}

export default RelationsPage;