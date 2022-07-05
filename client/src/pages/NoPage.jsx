import { Link } from "react-router-dom";

const NoPage = () => {
    return <>
        <div className="app_no-page-message">
            <p>Aucune page n'a été trouvée.</p>
        </div>
        <Link to='/'>
            <button className="app_button-icon">
                <i className="fa fa-home"></i> <span>Retour à l'accueil</span>
            </button>
        </Link>
    </>;
};
  
export default NoPage;