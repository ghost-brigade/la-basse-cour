import { useState } from "react";
import { Link } from 'react-router-dom';
import SendButton from "../components/form/SendButton";

const LoginPage = (props) => {
    const [values, setValues] = useState({});

    const handleChangeForm = event => {
        const id = event.target.id;
        const value = event.target.value;

        setValues({
            ...values,
            [id]: value,
        });
    }

    return (
        <main>
            <div className="app_main-content">
                <h1>Me connecter</h1>
                <form>
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
                    <div className="form-group">
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
                        <small id="emailHelp" class="form-text text-muted">Mot de passe oublié ?</small>
                    </Link>
                    <SendButton />
                </form>
            </div>
        </main>
    )
}

export default LoginPage;