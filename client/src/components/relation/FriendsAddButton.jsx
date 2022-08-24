import { Link } from "react-router-dom";

const FriendsAddButton = () => {
    return (
        <Link to="/relations/search">
            <button className="app_friends-add-button">
                <i className="fa fa-plus"></i>
            </button>
        </Link>
    )
}

export default FriendsAddButton;