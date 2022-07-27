import icon_site from '../assets/images/icon_site.png';

const BannedPage = () => {
    return (
        <main className="app_small-interace">
            <div className="app_icon-container">
                <img className="app_icon-site" width="50px" height="50px" src={icon_site} alt=""/>
            </div>
            <div className="app_main-content">
                <h1>Vilain, c'est interdit pour toi</h1>
                <p>Vous êtes banni !</p>
            </div>
        </main>
    )
}

export default BannedPage;