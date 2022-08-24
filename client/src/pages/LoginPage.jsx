import { useContext, useEffect, useState } from "react";
import SendButton from "../components/form/SendButton";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { login, loginByEmail } from "../utils/user_management";
import icon_site from '../assets/images/icon_site.png';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [values, setValues] = useState({});
    const [connectWithEmail, setConnectWithEmail] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, []);

    const handleChangeForm = event => {
        const id = event.target.id;
        const value = event.target.value;

        setValues({
            ...values,
            [id]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (connectWithEmail) {
            const emailSent = await loginByEmail(values.email);
            console.log(emailSent);
        } else {
            const user = await login(values);
            if (user) {
                setCurrentUser(user);
                navigate('/');
            }
        }
    }

    const handleChangeConnectWithEmail = (event) => {
        setConnectWithEmail(event.target.checked);
    }

    return (
        <main className="app_small-interace">
            <div className="app_icon-container">
                <img className="app_icon-site" width="50px" height="50px" src={icon_site} alt=""/>
            </div>
            <div className="app_main-content">
                <h1>Me connecter</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label> 
                        <input 
                            type='mail'
                            id='email'
                            className="form-control"
                            value={values.email}
                            onChange={handleChangeForm}
                        />
                    </div>
                    <div className="custom-control custom-switch">
                        <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            id="sendEmail_switch" 
                            checked={connectWithEmail} 
                            onChange={handleChangeConnectWithEmail}
                        />
                        <label className="custom-control-label" htmlFor="sendEmail_switch">Envoyer un lien à mon adresse mail</label>
                    </div>
                    {
                        connectWithEmail
                        ? ''
                        : <>
                            <div className="form-group mt-4">
                                <label htmlFor="password">Mot de passe</label> 
                                <input 
                                    type='password'
                                    id='password'
                                    className="form-control"
                                    value={values.password}
                                    onChange={handleChangeForm}
                                />
                            </div>
                            <Link to='/forgotten-password'>
                                <small id="emailHelp" className="form-text text-muted">Mot de passe oublié ?</small>
                            </Link>
                        </>
                    }
                    <div className="app_buttons-container">
                        <SendButton />
                        <Link to="/register">
                            <button type='button' className='app_button-icon'>
                                <i className="fa fa-user-plus"/>Créer un compte
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default LoginPage;