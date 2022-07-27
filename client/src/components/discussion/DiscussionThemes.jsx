const DiscussionThemes = (props) => {
    const {id, themes} = props.discussion;

    if (!themes.length) {
        return '';
    }

    return (
        <>
            <div className="app_discussion-themes">
                <div className="app_discussion-themes-count">{themes.length}</div>
                <div className="app_discussion-themes-list">
                    {themes
                    .map(theme => <div key={`${id}_theme_preview_${theme}`} className="app_discussion-theme-preview">
                        {theme}
                    </div>)}
                </div>
            </div>
        </>
    );
}

export default DiscussionThemes;