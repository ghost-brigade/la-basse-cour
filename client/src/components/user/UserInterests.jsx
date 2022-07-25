import { useEffect } from "react";
import { useState } from "react";


const UserInterests = (props) => {
    const [nbEdition, setNbEdition] = useState(0);

    const handleChangeInterest = (event) => {
        const interest = event.target.value;
        if (interest) {
            props.handleAddInterest(interest);
        }
        setNbEdition(nbEdition + 1);
    }

    const handleRemoveInterest = (event) => {
        const elementDOM = event.target.parentNode;
        const interest = elementDOM.id;

        props.handleRemoveInterest(interest);
        setNbEdition(nbEdition + 1);
    }

    return (
        <div className="my-2">
            {
                props.user.technologies && props.user.technologies.length
                ? <>
                    <p>{props.title}</p>
                    <div className="app_profile-interests-list">
                        {props.user.technologies.map(technology => <div 
                            key={`interest_${technology}`} 
                            id={technology}
                            className={`app_profile-interest`}
                        >
                            {technology} <i className="fa fa-close app_danger" onClick={handleRemoveInterest}/>
                        </div>)}
                    </div>
                </>
                : ''
            }
            <div className="form-group">
                <label htmlFor="technologies">Choisir des intérêts supplémentaires</label>
                <select className="form-control" id="technologies" name='technologies' onChange={handleChangeInterest}>
                    <option>Sélectionnez une technologie</option>
                    {allTechnologies.filter(technology => {
                        return !props.user.technologies 
                            || props.user.technologies.length === 0 
                            || !props.user.technologies.includes(technology)
                    }).sort()
                    .map(technology => <option key={`interest_${technology}`} value={technology}>
                        {technology}
                    </option>)}
                </select>
            </div>
        </div>
    )
}

UserInterests.defaultProps = {
    title: 'Mes centres d\'intérêt'
}

export default UserInterests;



const allTechnologies = [
    'Bootstrap', 'Tailwind CSS', 'Bulma', 'Foundation', 'Primer CSS', 'Spectre CSS', 'Materialize CSS', 'Onsen UI', 'Semantic UI', 'Blaze UI', 'Pure CSS', 'Tachyons', 'CSS', 'Preprocessors', 'SASS', 'LESS',
    'ES6',
    'TypeScript',
    'AngularJS',
    'VueJS',
    'Nuxt.js',
    'jQuery',
    'jQuery UI',
    'jQuery Mobile',
    'ReactJS',
    'Next.js',
    'React Desktop',
    'React Suite',
    'React Material UI', 
    'PHP',
    'Laravel',
    'WordPress',
    'NodeJS',
    'Python',
    'Django',
    'Ruby',
    'Ruby on Rails',
    'Java',
    'Spring',
    'Hibernate',
    '.NET',
    'Postgre SQL',
    'MariaDB',
    'MySQL',
    'MongoDB'
];