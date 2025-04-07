import { useState, useEffect } from "react";

export default function usePersistedState(key, initialValue) {
    const [state, setState] = useState(() => {
        const stored = localStorage.getItem(key);
        try {
            return stored ? JSON.parse(stored) : initialValue;
        } catch (err) {
            console.warn(`Invalid JSON in localStorage for key "${key}"`, err);
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
