import HomePage from '../pages/HomePage';
import StatisticsPage from '../pages/StatisticsPage';
import DiscussionsPage from '../pages/DiscussionsPage';
import ProfilePage from '../pages/ProfilePage';
import RelationsPage from '../pages/RelationsPage';
import RelationsAddPage from '../pages/RelationAddPage';
import DiscussionAddPage from '../pages/DiscussionAddPage';

export const appPages = [
    {
        id: 'home',
        path: '/', 
        label: 'Accueil',
        iconClassNames: ['fa fa-home'],
        element: <HomePage />,
        visibleMenu: () => true,
        userAccess: (user) => isConnected(user),
    },
    {
        id: 'discussions', 
        path: '/discussions', 
        label: 'Discussions',
        iconClassNames: ['fa fa-comment'], 
        element: <DiscussionsPage />,
        visibleMenu: () => true,
        userAccess: (user) => isConnected(user),
    },
    {
        id: 'discussions', 
        path: '/discussions/search', 
        label: 'Discussions',
        iconClassNames: ['fa fa-comment'], 
        element: <DiscussionAddPage />,
        visibleMenu: () => false,
        userAccess: (user) => isConnected(user),
    },
    {
        id: 'relation', 
        path: '/relations', 
        label: 'Relations',
        iconClassNames: ['fa fa-users'], 
        element: <RelationsPage />,
        visibleMenu: () => true,
        userAccess: (user) => isConnected(user),
    },
    {
        id: 'relation_search', 
        path: '/relations/search', 
        label: 'Relations',
        iconClassNames: ['fa fa-users'], 
        element: <RelationsAddPage />,
        visibleMenu: () => false,
        userAccess: (user) => isConnected(user),
    },
    {
        id: 'statistics', 
        path: '/statistics', 
        label: 'Statistiques',
        iconClassNames: ['fa fa-bar-chart'], 
        element: <StatisticsPage />,
        visibleMenu: (user) => isGranted(user, ['admin']),
        userAccess: (user) => isConnected(user) && isGranted(user, ['admin']),
    },
    {
        id: 'profile', 
        path: '/profile', 
        label: 'Profil',
        iconClassNames: ['fa fa-user'], 
        element: <ProfilePage />,
        visibleMenu: () => false,
        userAccess: (user) => isConnected(user),
    },
    {
        id: 'settings', 
        path: '/settings', 
        label: 'Paramètres',
        iconClassNames: ['fa fa-cog'],
        visibleMenu: () => false,
        userAccess: (user) => isConnected(user),
    },
];

const isConnected = (user) => {
    return user.id !== null && user.id !== undefined;
}
const isGranted = (user, roles) => {
    if (!user.roles) {
        return false;
    }

    return user.roles.some(role => roles.includes(role));
}

export const getRoutes = (user) => {
    return appPages.filter(page => page.userAccess(user));
}

export const getMenuLinks = (user) => {
    let matchingPages = [];
    
    for (let index in appPages) {
        const page = appPages[index];
        if (page.visibleMenu(user) && page.userAccess(user)) {
            matchingPages.push(page);
        }
    }
    
    return matchingPages;
}

export const getTitle = (path) => {
    for (let index in appPages) {
        const page = appPages[index];
        if (page.path === path) {
            return page.label;
        }
    }
    return '';
}