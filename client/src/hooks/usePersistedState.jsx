import { useState, useEffect } from "react";

export default function usePersistedState(key, initialValue) {
    const [state, setState] = useState(() => {
        const stored = localStorage.getItem(key);
        if (stored) return JSON.parse(stored);
        return typeof initialValue === 'function' ? initialValue() : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
