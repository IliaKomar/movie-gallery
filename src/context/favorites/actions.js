export const addMovie = (movie) => {
  return {
    type: "ADD_MOVIE",
    movie,
  };
};

export const removeMovie = (movieId) => {
  return {
    type: "REMOVE_MOVIE",
    movieId,
  };
};