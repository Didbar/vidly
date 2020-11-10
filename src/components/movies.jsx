import React, { Component } from 'react';
import { deleteMovie, getMovies } from '../services/fakeMovieService';

class Movies extends Component {
    state = {
        movies: getMovies()
    };

    handleDelete = (id) => {
        const movies = this.state.movies.filter(m => m._id !== id);
        this.setState({ movies })
    };

    render() {

        const moviescomponent = this.state.movies.map((movie) => {
            return (
                <tr key={movie._id}>
                    <th scope="row">{movie.title}</th>
                    <th>{movie.genre.name}</th>
                    <th>{movie.numberInStock}</th>
                    <th>{movie.dailyRentalRate}</th>
                    <th className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie._id)}>Delete</th>
                </tr>);
        })

        return (
            <main className="container">
                {this.state.movies.length !== 0 ?
                    <table className="table table-hover">
                        <caption>Showing {this.state.movies.length} Movies in The Database</caption>
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Rate</th>
                                <th scope="col"> </th>
                            </tr>
                        </thead>
                        <tbody>
                            {moviescomponent}
                        </tbody>
                    </table>
                    :
                    <h2>There Are No Movies In Database</h2>
                }
            </main>
        );
    }

}

export default Movies;


