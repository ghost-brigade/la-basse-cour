import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiccusionCreate from "../components/discussion/DiccusionCreate";
import DiscussionPreview from "../components/discussion/DiscussionPreview";
import SearchFilters from "../components/form/SearchFilters";
import UserInterests from "../components/user/UserInterests";
import DiscussionContext from "../contexts/discussion/DiscussionContext";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { getAllThemes, getDiscussionsTheme, joinDiscussion } from "../utils/discussion_management";

const user_filters = [
    {'id': 'label', 'label': 'Nom de la discussion', 'type': 'text'},
]

const DiscussionAddPage = (props) => {
    const navigate = useNavigate();
    const {currentUser} = useContext(CurrentUserContext);
    const {setSelectedDiscussion} = useContext(DiscussionContext);
    const [filterValues, setFilterValues] = useState({
        'label': '',
        'technologies': currentUser ? currentUser.technologies : [],
    });
    const [showFilter, setShowFilter] = useState(false);
    const [showCreation, setShowCreation] = useState(true);

    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        refreshDiscussions();
    }, [filterValues]);

    const refreshDiscussions = async () => {
        const discussions = await getDiscussionsTheme(filterValues);
        if (discussions && discussions.length) {
            setDiscussions(discussions);
        } else {
            setDiscussions([]);
        }
    }

    const toggleShowFilters = () => {
        if (!showFilter) {
            setShowCreation(false);
        }
        setShowFilter(!showFilter);
    }

    const toggleCreateDiscussion = () => {
        if (!showCreation) {
            setShowFilter(showCreation);
        }
        setShowCreation(!showCreation);
    }

    const handleChangeValue = (id, value) => {
        setFilterValues({...filterValues, [id]: value});
    }

    const handleAddInterest = (interest) => {
        const user = filterValues;
        if (!user.technologies.includes(interest)) {
            user.technologies.push(interest);
        }
        setFilterValues(user);
        refreshDiscussions();
    }
    
    const handleRemoveInterest = (interest) =>{
        const user = filterValues;
        user.technologies = user.technologies.filter(technology => technology !== interest);
        setFilterValues(user);
        refreshDiscussions();
    }

    const handleJoinDiscussion = async (discussionId) => {
        const discussion = discussions.find(disc => disc.id === discussionId);
        const joined = await joinDiscussion(discussionId);
        if (joined && discussion) {
            setSelectedDiscussion(discussion);
            navigate('/discussions');
            //setDiscussions(discussions.filter(disc => disc.id !== discussionId));
        }
    }

    return (
        <>
            <h2 className="app_title-button">
                {showFilter ? 'Rechercher' : ''} 
                {showCreation ? 'Création' : ''} 
                {!showFilter && !showCreation ? <span></span> : ''}
                <div className="app_title-mutliple-buttons">
                    <button className="app_title-primary-button pr-3" onClick={toggleShowFilters}>
                        <i className="fa fa-filter mx-2"/> Trouver
                    </button>
                    <button className="app_title-primary-button pr-3" onClick={toggleCreateDiscussion}>
                        <i className="fa fa-plus mx-2"/> Créer
                    </button>
                </div>
            </h2>
            {
                showFilter 
                    ? <>
                        <SearchFilters filters={user_filters} values={filterValues} handleChangeValue={handleChangeValue}>
                            <UserInterests
                                title={'Centres d\'intérêts sélectionnés'}
                                user={filterValues} 
                                handleAddInterest={handleAddInterest}
                                handleRemoveInterest={handleRemoveInterest}
                            />
                        </SearchFilters>
                        <section>
                            {
                                discussions.map(discussion =>
                                    <DiscussionPreview
                                        key={`discussion_preview_${discussion.id}`}
                                        discussion={discussion}
                                        isSelected={false}
                                        handleDiscussionClick={() => {}}
                                    >
                                        <button type='button' className='app_button-icon app_success' onClick={() => handleJoinDiscussion(discussion.id)}>
                                            <i className="fa fa-plus"/>Rejoindre
                                        </button>
                                    </DiscussionPreview>
                                )
                            }
                        </section>
                    </>
                    : ''
            }
            {
                showCreation
                    ? <DiccusionCreate/>
                    : ''
            }
            {!showFilter && !showCreation 
                ? <div className="text-center mt-3">
                    <p>Vous êtes dans l'espace de recherche et de création de discussions.</p>
                    <p>Utilisez les boutons ci-dessus pour rechercher ou créer une discussion selon vos besoins.</p>
                </div>
                : ''
            }
        </>
    );
}

export default DiscussionAddPage;