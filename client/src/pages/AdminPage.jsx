import { useState } from "react";

const AdminPage = (props) => {
    const [usersSignaled, setUsersSignaled] = useState([]);

    return (
        <div className='app_admin-page'>
            <h2>Utilisateurs signalés</h2>
            <div>
                {usersSignaled}
            </div>
        </div>
    );
}

export default AdminPage;