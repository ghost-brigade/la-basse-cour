import { useContext, useEffect, useState } from "react";
import SendButton from "../components/form/SendButton";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { register } from "../utils/user_management";
import icon_site from '../assets/images/icon_site.png';
import { Link, useNavigate } from 'react-router-dom';
import UserInterests from "../components/user/UserInterests";

const RegisterPage = (props) => {
    const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
    const [values, setValues] = useState({
        'email': '',
        'firstname': '',
        'lastname': '',
        'password': '',
        'schoolBranch': '',
        'technologies': [],
    });

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

        const user = await register(values);
        if (user) {
            navigate('/');
        }
    }

    const handleAddInterest = (interest) => {
        const user = values;
        if (!user.technologies.includes(interest)) {
            user.technologies.push(interest);
        }
        setValues(user);
    }
    
    const handleRemoveInterest = (interest) =>{
        const user = values;
        user.technologies = user.technologies.filter(technology => technology !== interest);
        setValues(user);
    }

    return (
        <main className="app_small-interace">
            <div className="app_icon-container">
                <img className="app_icon-site" width="50px" height="50px" src={icon_site} alt=""/>
            </div>
            <div className="app_main-content">
                <h1>Créer un compte</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label> 
                        <input 
                            type='mail'
                            id='email'
                            className="form-control"
                            value={values.email}
                            onChange={handleChangeForm}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Mot de passe</label> 
                        <input 
                            type='password'
                            id='password'
                            className="form-control"
                            value={values.password}
                            onChange={handleChangeForm}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstname">Prénom</label> 
                        <input 
                            type='firstname'
                            id='firstname'
                            className="form-control"
                            value={values.firstname}
                            onChange={handleChangeForm}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Nom</label> 
                        <input 
                            type='lastname'
                            id='lastname'
                            className="form-control"
                            value={values.lastname}
                            onChange={handleChangeForm}
                            required={true}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="schoolBranch">Classe</label> 
                        <input 
                            type='schoolBranch'
                            id='schoolBranch'
                            className="form-control"
                            value={values.schoolBranch}
                            onChange={handleChangeForm}
                            required={true}
                        />
                    </div>
                    <UserInterests
                        user={values} 
                        handleAddInterest={handleAddInterest}
                        handleRemoveInterest={handleRemoveInterest}
                    />
                    <div className="app_buttons-container">
                        <SendButton />
                        <Link to="/login">
                            <button type='button' className='app_button-icon'>
                                <i className="fa fa-user"/>Me connecter
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default RegisterPage;