import { useEffect, useReducer, useRef } from 'react';

function useFetch(url) {
    const cache = useRef({});
    const cancelRequest = useRef(false);

    const initialState = {
        error: undefined,
        data: undefined,
    };

    const fetchReducer = (state, action) => {
        switch (action.type) {
        case 'loading':
            return { ...initialState };
        case 'fetched':
            return { ...initialState, data: action.payload };
        case 'error':
            return { ...initialState, error: action.payload };
        default:
            return state;
        }
    };

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            dispatch({ type: 'loading' });
            if (cache.current[url]) {
                dispatch({ type: 'fetched', payload: cache.current[url] });
                return;
            }

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();
                const updatedData = data.map((movie) => {
                    return {
                        ...movie,
                        genres: movie.genres.map((genre) => genre.toLowerCase()),
                    };
                });
                cache.current[url] = updatedData;

                if (cancelRequest.current) return;
                dispatch({ type: 'fetched', payload: updatedData });
            } catch (error) {
                if (cancelRequest.current) return;
                dispatch({ type: 'error', payload: error });
            }
        };

        fetchData();
        return () => {
            if (state.data) {
                cancelRequest.current = true;
            }
        };
    }, [url]);

    return state;
}

export default useFetch;
