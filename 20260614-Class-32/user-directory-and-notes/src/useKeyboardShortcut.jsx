import {useEffect} from 'react';

function useKeyboardShortcut(key, callback) {
    useEffect(() => {
        const handleKeyDown = (event) => {
            if(event.target.tagName == 'INPUT' || event.target.tagName == 'TEXTAREA') {
                return;
            }

            if(event.key === key) {
                event.preventDefault();
                callback();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [key, callback]);
}

export default useKeyboardShortcut;