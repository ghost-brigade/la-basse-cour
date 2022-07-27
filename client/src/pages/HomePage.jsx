import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DiscussionPreview from "../components/discussion/DiscussionPreview";
import DiscussionContext from "../contexts/discussion/DiscussionContext";
import CurrentUserContext from "../contexts/user/CurrentUserContext";
import { getAllThemes, getDiscussionsTheme, joinDiscussion } from "../utils/discussion_management";

const HomePage = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(CurrentUserContext);
    const {setSelectedDiscussion} = useContext(DiscussionContext);

    const allThemes = getAllThemes();
    const [searchTheme, setSearchTheme] = useState('');
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [showAllThemes, setShowAllThemes] = useState(false);

    const [discussions, setDiscussions] = useState([]);

    const handleSelectTheme = async (theme) => {
        setSelectedTheme(theme);
        const discussions = await getDiscussionsTheme({
            'technologies': [theme],
        });
        if (discussions && discussions.length) {
            setDiscussions(discussions);
        } else {
            setDiscussions([]);
        }
    }

    const handleJoinDiscussion = async (discussionId) => {
        const discussion = discussions.find(disc => disc.id === discussionId);
        const joined = await joinDiscussion(discussionId);
        if (joined && discussion) {
            setSelectedDiscussion(discussion);
            navigate('/discussions');
        }
    }

    return (
        <>
            <h2>Trouver des discussions</h2>
            <div className="form-group">
                <input
                    value={searchTheme}
                    onChange={(e) => setSearchTheme(e.target.value)}
                    type="text"
                    placeholder="Rechercher un thème"
                    className="form-control"
                />
            </div>
            <section className={`app_themes-grid${showAllThemes ? ' opened': ''}`}>
                <section className="app_grid app_themes-list">
                    {allThemes
                        .filter(theme => theme.toUpperCase().includes(searchTheme.toUpperCase()))
                        .sort()
                        .map(theme => <div key={`theme_${theme}`} className="app_card app_card-colored" onClick={() => handleSelectTheme(theme)}>
                            <p>{theme} {selectedTheme === theme ? <i className="fa fa-check"/> : ''}</p>
                        </div>)}
                </section>
                <div className="text-center">
                    <i className="app_open-indicator fa fa-chevron-down px-5" onClick={() => setShowAllThemes(!showAllThemes)}/>
                </div>
            </section>
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
    );
};
  
export default HomePage;