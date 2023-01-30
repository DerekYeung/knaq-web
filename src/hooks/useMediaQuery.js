import { useState, useEffect } from 'react';
import useEventListener from './useEventListener';

export default function useMediaQuery(query) {
    const [isMatch, setIsMatch] = useState(false);
    const [mediaQueryList, setMediaQueryList] = useState(window.matchMedia("width:1px"));

    useEffect(() => {
        const list = window.matchMedia(query)
        setMediaQueryList(list)
        setIsMatch(list.matches)

    }, [query])

    useEventListener('change', e => setIsMatch(e.matches), mediaQueryList)

    return isMatch;
}