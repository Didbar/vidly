import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Movie from './movie'
import Pagination from './common/pagination'
import { paginate } from '../utils/paginate'

class Movies extends Component {
    state = {
        movies: getMovies(),
        pageSize: 4,
        currentPage: 1
    };


    handleDelete = (id) => {
        const movies = this.state.movies.filter(m => m._id !== id);
        this.setState({ movies })
    };

    handleLike = (movie) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(movie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked
        this.setState({
            movies
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currentPage: page
        })
    }

    render() {

        const { length: count } = this.state.movies;
        const { pageSize, currentPage, movies } = this.state;

        if (count === 0) return <h2>There Are No Movies In Database</h2>
        const moviesPaginated = paginate(movies, currentPage, pageSize);

        return (
            <main className="container">
                <table className="table table-hover">
                    <caption style={{ captionSide: 'top' }}  >Showing {this.state.movies.length} Movies in The Database</caption>
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
                        {moviesPaginated.map(movie => {
                            return <Movie
                                key={movie._id}
                                movie={movie}
                                onDelete={this.handleDelete}
                                onLike={this.handleLike}


                            />
                        })}

                    </tbody>
                </table>
                <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                />

            </main>
        );
    }

}

export default Movies;


