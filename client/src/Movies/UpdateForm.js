import React, { useState, useEffect } from "react";
import axios from "axios";

const intitialMovie = {
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateForm = props => {
  const [movie, setMovie] = useState(intitialMovie);

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  }, [props]);

  const changeHandler = (ev, i) => {
    ev.persist();
    let value = ev.target.value;
    console.log(movie);

    setMovie({
      ...movie,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

        {movie.stars &&
          movie.stars.map((star, i) => (
            <div className="baseline" key={star}>
              <input
                type="text"
                name="stars"
                onChange={e => changeHandler(e, i)}
                placeholder="Stars"
                value={movie.stars[i]}
              />
            </div>
          ))}

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;
