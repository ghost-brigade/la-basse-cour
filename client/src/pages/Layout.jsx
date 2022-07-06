import { getByTitle } from "@testing-library/react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { 
    Outlet, 
    Link,
    useMatch,
    useResolvedPath
} from "react-router-dom";
import icon_site from '../assets/images/icon_site.png';
import UserIcon from "../components/user/UserIcon";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { getMenuLinks, getTitle } from "../utils/route_management";

const Layout = (props) => {
    const {currentUser} = useContext(CurrentUserContext);
    const menuLinks = getMenuLinks(currentUser);

    const [title, setTitle] = useState('');
    const match = useMatch({ path: window.location.pathname, end: true });
    useEffect(() => {
        if (match) {
            setTitle(getTitle(match.pathname));
        }
    }, [match]);

    return (
        <>
            <aside className="app_menu">
                <Link to='/' className="app_menu-outside-link noPadding">
                    <img className="app_icon-site" width="50px" height="50px" src={icon_site} alt=""/>
                </Link>
                <nav role="navigation" className="app_menu-links">
                    <ul>
                        {
                            menuLinks?.map(link =>
                                <li key={link.id}>
                                    <MenuLink to={link.path}>
                                        <i className={link.iconClassNames.join(' ')}/>
                                    </MenuLink>
                                </li>
                            )
                        }
                    </ul>
                </nav>
                <MenuLink to="/settings" className='app_menu-outside-link'>
                    <i className="fa fa-cog"></i>
                </MenuLink>
            </aside>


            <main>
                <header className="app_header">
                    <h1>{title}</h1>
                    <div className="app_header-actions">
                        <div className="app_input-icon app_header-search">
                            <input placeholder="Search"/>
                            <i className="fa fa-search"></i>
                        </div>
                        <button>
                            <i className="fa fa-bell"></i>
                        </button>
                        <UserIcon img={currentUser?.img}/>
                    </div>
                </header>

                <div className="app_main-content">
                    <Outlet/>
                </div>
            </main>
        </>
    )
};

const MenuLink = ({ children, to, ...props }) => {
    const resolved = useResolvedPath(to);
    const match = useMatch({ path: resolved.pathname, end: true });
  
    return (
        <Link
          className={ match ? "selected" : "" }
          to={to}
          {...props}
        >
          {children}
        </Link>
    );
  }  

export default Layout;