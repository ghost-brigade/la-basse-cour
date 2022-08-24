import { useState } from "react";
import SendButton from "../components/form/SendButton";

const LoginPage = (props) => {
    const [email, setEmail] = useState('');

    const handleChange = event => {
        setEmail(event.target.value);
    }

    return (
        <main>
            <div className="app_main-content">
                <h1>Mot de passe oublié</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email</label> 
                        <input 
                            type='mail'
                            id='email'
                            className="form-control"
                            value={email}
                            onChange={handleChange}
                        />
                    </div>
                    <SendButton/>
                </form>
            </div>
        </main>
    )
}

export default LoginPage;