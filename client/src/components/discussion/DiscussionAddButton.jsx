import { Link } from "react-router-dom";

const DiscussionAddButton = (props) => {
    return (
        <Link to="/discussions/search">
            <button className="app_title-primary-button">
                <i className="fa fa-plus"></i>
            </button>
        </Link>
    );
}

export default DiscussionAddButton;