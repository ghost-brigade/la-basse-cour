import { useContext, useEffect, useState } from "react";
import SendButton from "../components/form/SendButton";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { login, loginByEmail, loginFromToken, setUserToken } from "../utils/user_management";
import icon_site from '../assets/images/icon_site.png';
import { Link, useMatch, useNavigate, useParams } from 'react-router-dom';

const LoginEmailPage = (props) => {
    const {token} = useParams();
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
            return;
        }
        connectUser();
    }, []);

    const connectUser = async () => {
        const user = await loginFromToken(token);
        if (user) {
            setCurrentUser(user);
            navigate('/');
        }
    }

    return (
        <main className="app_small-interace">
            <div className="app_icon-container">
                <img className="app_icon-site" width="50px" height="50px" src={icon_site} alt=""/>
            </div>
            <div className="app_main-content">
                <h1>Connexion</h1>
                <div className="px-3 py-5 text-center">
                    <i className="fa fa-spin fa-spinner"/> Connexion en cours...
                </div>
            </div>
        </main>
    )
}

export default LoginEmailPage;