export function reducer(state, action) {
    switch (action.type) {
        case "ADD_MOVIE":
            return [...state, action.movie];
        case "REMOVE_MOVIE":
            return state.filter((movie) => movie.id !== action.movieId);
        default:
            throw new Error();
    }
}