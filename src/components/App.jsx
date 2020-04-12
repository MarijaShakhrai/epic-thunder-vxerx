import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles.css";
import "../index.css";
//import moviesData from "../moviesData";
import MovieItem from "./MovieItem";
import MovieTabs from "./MovieTabs";
import MoviePagination from "./MoviePagination";
import MovieWatchItem from "./MovieWatchItem";
import { API_URL, API_KEY_3 } from "../utils/api";

// UI = fn(state, props)

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [], //moviesData,
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      page: 1,
      data: {}
    };
  }
  // перший раз зренедерено компоненту
  componentDidMount() {
    console.log("didMount");
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("didUpdate");
    console.log("prev", prevProps, prevState);
    console.log("prev", this.props, this.state);

    if (
      prevState.sort_by !== this.state.sort_by ||
      prevState.page !== this.state.page
    ) {
      this.getMovies();
    }
  }

  getMovies = () => {
    console.log("call api");
    //console.log("didMount");
    const discoverMovie = `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
      this.state.sort_by
    }&page=${this.state.page}`;
    console.log(discoverMovie);
    fetch(discoverMovie)
      .then(response => {
        console.log("then");
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.setState({
          data: data,
          movies: data.results
        });
      });
    console.log("after fetch");
  };

  // стрілочна функція  - не звичайна функція, бо вона не має власного контексту, використовує юатьківський
  removeMovie = movie => {
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    const updateWatchMovies = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );
    this.setState({ movies: updateMovies, moviesWillWatch: updateWatchMovies });
    //this.removeMovie = this.removeMovie.bind(this);
  };

  // стрілочна функція  - не звичайна функція, бо вона не має власного контексту, використовує юатьківський
  removeMovieFromWillWatch = movie => {
    const updateMovies = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );
    this.setState({ moviesWillWatch: updateMovies });
    //this.removeMovie = this.removeMovie.bind(this);
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value
    });
  };

  nextPage = () => {
    console.log("nextPage");
    this.setState({
      page:
        this.state.page === this.state.data.total_pages
          ? this.state.page
          : this.state.page + 1
    });
  };
  prevPage = () => {
    console.log("prevPage");
    this.setState({
      page: this.state.page === 1 ? this.state.page : this.state.page - 1
    });
  };
  toPage = value => {
    console.log("toPage", value);

    this.setState({
      page: value
    });
  };

  addMovieToWillWatch = movie => {
    //this.state()
    // console.log(
    //   movie,
    //   this.state.moviesWillWatch.find(x => x.id === movie.id),
    //   this.state.moviesWillWatch.find(x => x.id === movie.id) === undefined
    // );
    if (this.state.moviesWillWatch.find(x => x.id === movie.id) === undefined) {
      const updateMovies = [...this.state.moviesWillWatch, movie];
      this.setState({
        moviesWillWatch: updateMovies
      });
    }
  };

  render() {
    //console.log(this);
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row mb-4 mt-4">
              <div className="col-12">
                <MovieTabs
                  sort_by={this.state.sort_by}
                  updateSortBy={this.updateSortBy}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <MoviePagination
                  nextPage={this.nextPage}
                  prevPage={this.prevPage}
                  page={this.state.data.page}
                  totalPage={this.state.data.total_pages}
                  toPage={this.toPage}
                />
              </div>
            </div>
            <div className="row">
              {this.state.movies.map(movie => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem
                      movie={movie}
                      willWatch={
                        this.state.moviesWillWatch.find(
                          x => x.id === movie.id
                        ) !== undefined
                      }
                      removeMovie={this.removeMovie}
                      addMovieToWillWatch={this.addMovieToWillWatch}
                      removeMovieFromWillWatch={this.removeMovieFromWillWatch}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-3">
            <div className="row">
              Will Watch: {this.state.moviesWillWatch.length}
            </div>
            <div className="row">
              {this.state.moviesWillWatch.map(movie => {
                return (
                  <div className="col-12 mb-4" key={movie.id}>
                    <MovieWatchItem movie={movie} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
