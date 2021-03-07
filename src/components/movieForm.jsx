import React from "react";

const MovieForm = ({ match, history }) => {
  return (
    <div className="row">
      <h2 className="col-10 offset-1">MovieForm Form: {match.params.id} </h2>
      <button
        onClick={() => history.push("/movies")}
        className="col btn btn-primary"
      >
        Save
      </button>
    </div>
  );
};

export default MovieForm;
