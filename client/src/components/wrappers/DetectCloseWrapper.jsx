import { useRef, useEffect } from 'react';

const DetectCloseWrapper = (props) => {
    const {closeFunction, ...objectProps} = props;
    const ref = useRef();
    useEffect(() => {
        const handleClick = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            closeFunction('hidden');
          }
        };
    
        document.addEventListener('click', handleClick);
    
        return () => {
          document.removeEventListener('click', handleClick);
        };
      }, [ref]);

      return <div ref={ref} {...objectProps}>
        {props.children}
      </div>;
}

export default DetectCloseWrapper;