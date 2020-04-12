import React from "react";
import noImage from "./../assets/no_image.png";
class MovieItem extends React.Component {
  constructor(props) {
    super();

    this.state = {
      willWatch: props.willWatch
    };
  }

  render() {
    // деструктуризація ES 5
    const {
      movie,
      removeMovie,
      addMovieToWillWatch,
      removeMovieFromWillWatch
    } = this.props;

    console.log(noImage);
    return (
      // movie.poster_path
      <div className="card">
        <img
          className="card-img-top"
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
              : noImage
          }
          alt=""
        />
        <div className="card-body">
          <h6 className="card-title">{movie.title}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Rating: {movie.vote_average}</p>
            {this.state.willWatch === true ? (
              <button
                className="btn btn-success"
                onClick={() => {
                  this.setState({ willWatch: false });
                  removeMovieFromWillWatch(movie);
                }}
              >
                Remove Will Watch
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  this.setState({ willWatch: true });
                  addMovieToWillWatch(movie);
                }}
              >
                Will Watch
              </button>
            )}
          </div>
          <button
            type="button"
            className="btn"
            onClick={removeMovie.bind(this, movie)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  // componentWillUnmount() {
  //   console.log("unmount", this.state, this.props);
  // }
}

export default MovieItem;
