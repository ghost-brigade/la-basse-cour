import { useState } from "react";
import DetectCloseWrapper from "./DetectCloseWrapper";

const OptionsWrapper = (props) => {
    const [classContent, setClassContent] = useState('hidden');

    const toggleContent = event => {
        setClassContent(classContent ? '' : 'hidden');
    }

    return (
        <DetectCloseWrapper
            closeFunction={() => setClassContent('hidden')}
            className='app_options-wrapper'
        >
            <span className="app_clickable-icon-container" onClick={toggleContent}>
                <i className="fa fa-ellipsis-v"/>
            </span>
            <div className={'app_popup app_options-wrapper-content ' + classContent}>
                {props.children}
            </div>
        </DetectCloseWrapper>
    )
}

export default OptionsWrapper;