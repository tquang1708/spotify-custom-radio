import { useState, useEffect, useRef } from 'react';

export default function useVisibleComponent(initial) {
    const [ isVisible, setIsVisible ] = useState(initial);
    const ref = useRef(null);

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target) && isVisible) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    return [ ref, isVisible, setIsVisible ];
}