import React, { Component } from "react";
import Like from "./common/like";
class Movie extends Component {
  render() {
    const { movie, onDelete, onLike } = this.props;
    return (
      <tr>
        <td>{movie.title}</td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td style={{ color: "green" }}>
          {" "}
          <Like liked={movie.liked} onClick={() => onLike(movie)} />
        </td>
        <td
          onClick={() => onDelete(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </td>
      </tr>
    );
  }

  likeMovie() {
    let classes = "fa ";
    classes += this.state.liked === false ? "fa-heart-o" : "fa-heart";
    return classes;
  }
}

export default Movie;
