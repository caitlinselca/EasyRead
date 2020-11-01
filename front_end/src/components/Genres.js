import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import isEmpty from "is-empty";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Genres.css";
import { fontFamily } from "@material-ui/system";
import genres from "../static/genres";
import getBooks from "../requests/genrespage"

const GenresView = props => {
  const [selectedGenres, setGenres] = useState([]);

  const history = useHistory();

  const submitGenre = async event => {
    event.preventDefault();
    let response = await getBooks(selectedGenres);
    console.log(response);
  };

  const handleChange = event => {
    let genre = event.currentTarget.value;
    let current = selectedGenres;
    let index = current.indexOf(genre);
    if(index > -1) current.splice(index, 1);
    else current.push(genre);
    setGenres(current);
  };

  const isSelected = event => {
    return selectedGenres.indexOf(event.currentTarget.value) > -1;
  }

  const useStyles = makeStyles(theme => ({
    textField: {
      //width: "100%"
    },
    unselectedButton: {
      color: "#fff",
      background: "#3f51b5",
      width: "30%",
      marginTop: "2%"
    },
    selectedButton: {
      color: "#fff",
      background: "#2f3d87",
      width: "30%",
      marginTop: "2%"
    },
    button2: {
      width: "100%"
    }
  }));

  const classes = useStyles();

  return (
    <div className = "Register">
            <div className="EasyReadTitle">
        {/* <label>
            Easy Read
        </label> */}
      </div>
    <div className = "RegisterContainer">
      <form onSubmit={submitGenre} autoComplete="off">
      <div className = "EasyReadRegisterTitle">
      <label>
          Select Your Favorite Genres!
      </label>
      </div>
        <br></br>
        <div className = "ButtonAlignment">
          {genres.map((genre) => (
            <span>
            <Button
              className={isSelected ? classes.unselectedButton : classes.selectedButton}
              variant="contained"
              color="primary"
              value={genre}
              onClick={handleChange}
            >
              {genre}
            </Button>{' '}
          </span>
          // <div className = "Button">
          ))}
        </div>
        <div className = "EndButton">
          <Button
            className={classes.button2}
            type="submit"
            variant="contained"
            //color="primary"
            // href="/subjects"
          >
            Next Page
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default GenresView;