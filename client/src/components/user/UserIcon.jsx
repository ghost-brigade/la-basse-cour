import { Link } from 'react-router-dom';

const UserIcon = (props) => {
    return (
        <Link to='/profile'>
            <button className="noPadding">
                <img src={props.img} width="50px" height="50px"/>
            </button>
        </Link>
    );
}

export default UserIcon;