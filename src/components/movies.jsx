import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import Movie from "./movie";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: {},
  };

  componentDidMount() {
    const genres = [{ name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (id) => {
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      currentPage: 1,
      selectedGenre: genre,
    });
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies, genres, selectedGenre } = this.state;

    if (count === 0) return <p>There Are No Movies In Database</p>;

    const moviesFilteredByGenre =
      selectedGenre && selectedGenre._id
        ? movies.filter((m) => m.genre._id === selectedGenre._id)
        : movies;

    const moviesPaginated = paginate(
      moviesFilteredByGenre,
      currentPage,
      pageSize
    );

    return (
      <main className="container">
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedItem={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <table className="table table-hover">
              <caption style={{ captionSide: "top" }}>
                Showing {moviesFilteredByGenre.length} Movies in The Database
              </caption>
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Rate</th>
                  <th scope="col"> </th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody>
                {moviesPaginated.map((movie) => {
                  return (
                    <Movie
                      key={movie._id}
                      movie={movie}
                      onDelete={this.handleDelete}
                      onLike={this.handleLike}
                    />
                  );
                })}
              </tbody>
            </table>
            <Pagination
              itemsCount={moviesFilteredByGenre.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
