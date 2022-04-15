const checkIsLocalStorageItem = (favoriteMoviesArr, id) => {
    if (!favoriteMoviesArr) {
        return false;
    }
    return favoriteMoviesArr.some(movie => movie.id === id);
};
export default checkIsLocalStorageItem;
