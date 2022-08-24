import { createContext } from "react";

const DiscussionContext = createContext({
    selectedDiscussion: null,
    setSelectedDiscussion: () => {}
});

export default DiscussionContext;