import { useEffect, useState } from "react";
import SearchFilters from "../components/form/SearchFilters";
import UserPreview from "../components/user/UserPreview";
import { getFriendsList, toggleFriendship } from "../utils/relation_management";
import { getAllSchoolBranches, getAllUsers } from "../utils/user_management";
import UserInterests from "../components/user/UserInterests";

const user_filters = [
    {'id': 'fullname', 'label': 'Nom complet', 'type': 'text'},
    {'id': 'schoolBranch', 'label': 'Classe', 'placeholder': 'Choisissez une classe','type': 'select', 'options': getAllSchoolBranches().map(option => ({'value': option, 'label': option}))},
]

const RelationsAddPage = (props) => {
    const [nbAddFrienship, setNbAddFrienship] = useState(0);
    const [filterValues, setFilterValues] = useState({
        'fullname': '',
        'schoolBranch': '',
        'technologies': [],
    });
    const [showFilter, setShowFilter] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersMatch, setUsersMatch] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        connectUsers();
    }, []);

    const connectUsers = async () => {
        const users = await getAllUsers();
        setUsers(users);
        setUsersMatch(users);
        const userFriends = await getFriendsList();
        setFriends(userFriends);
    }

    const handleAddFriendship = async (userId) => {
        const friendship = await toggleFriendship(userId);
        if (friendship && friendship?.id) {
            const newFriends = friends;
            newFriends.push(friendship);
            setFriends(newFriends);
            setNbAddFrienship(nbAddFrienship + 1);
        }
    }

    const toggleShowFilters = () => {
        setShowFilter(!showFilter);
    }

    const refreshUsersMatch = () => {
        let usersMatching = users;

        Object.keys(filterValues).forEach(key => {
            if (filterValues[key]) {
                switch (key) {
                    case 'fullname':
                        usersMatching = usersMatching.filter(user => `${user.firstname} ${user.lastname}`.toLowerCase().includes(filterValues[key].toLowerCase()));
                        break;
                    case 'technologies':
                        for (let index in filterValues[key]) {
                            const technology = filterValues[key][index];
                            usersMatching = usersMatching.filter(user => user[key].includes(technology));
                        }
                        break;
                    default:
                        usersMatching = usersMatching.filter(user => user[key] === filterValues[key]);
                        break;
                }
            }
        });

        setUsersMatch(usersMatching);
    }

    useEffect(() => {
        refreshUsersMatch();
    }, [filterValues]);

    const handleChangeValue = (id, value) => {
        setFilterValues({...filterValues, [id]: value});
    }

    const handleAddInterest = (interest) => {
        const user = filterValues;
        if (!user.technologies.includes(interest)) {
            user.technologies.push(interest);
        }
        setFilterValues(user);
        setTimeout(() => {
            refreshUsersMatch();
        }, 500);
    }
    
    const handleRemoveInterest = (interest) =>{
        const user = filterValues;
        user.technologies = user.technologies.filter(technology => technology !== interest);
        setFilterValues(user);
        setTimeout(() => {
            refreshUsersMatch();
        }, 500);
    }

    return (
        <>
            <h2 className="app_title-button">
                Ajouter 
                <button className="app_title-primary-button" onClick={toggleShowFilters}>
                    <i className="fa fa-filter"/>
                </button>
            </h2>
            {
                showFilter 
                    ? <SearchFilters filters={user_filters} values={filterValues} handleChangeValue={handleChangeValue}>
                        <UserInterests
                            title={'Centres d\'intérêts sélectionnés'}
                            user={filterValues} 
                            handleAddInterest={handleAddInterest}
                            handleRemoveInterest={handleRemoveInterest}
                        />
                    </SearchFilters>
                    : ''
            }
            <section className="app_friends-list">
                {
                    usersMatch.filter(user => !friends.map(friendship => friendship.friend.id).includes(user.id))
                    .map(user => <UserPreview 
                        key={user.id} 
                        user={user}
                    >
                        <div onClick={() => handleAddFriendship(user.id)}>
                            <i className="fa fa-user-plus icon_rounded app_success"/>
                        </div>
                    </UserPreview>)
                }
            </section>
        </>
    );
}

export default RelationsAddPage;