import React from "react";
const MovieWatchItem = props => {
  const { movie } = props;
  return <div>{movie.title}</div>;
};
export default MovieWatchItem;
