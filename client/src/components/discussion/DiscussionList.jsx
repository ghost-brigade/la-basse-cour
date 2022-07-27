import DiscussionPreview from "./DiscussionPreview";

const DiscussionList = (props) => {
    const {discussions} = props;

    return (
        <ul className="app_discussion-list">
            {discussions.map(discussion => (
                <DiscussionPreview
                    key={discussion.id}
                />
            ))}
        </ul>
    )
}

export default DiscussionList;