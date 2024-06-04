import { MutableRefObject, useEffect } from 'react';

const useDetectOutsideClick = (ref: MutableRefObject<HTMLDivElement | null>, callback: (e: Event) => void) => {
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current != null && !ref.current.contains(e.target as Node)) {
            callback(e);
        }
    };

    useEffect(() => {
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            // Unbind the event listener on cleanup
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, callback]);
};

export default useDetectOutsideClick;