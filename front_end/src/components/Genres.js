import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Genres.css";
import { fontFamily } from "@material-ui/system";
import genres from "../static/genres";
import { getBooks, saveGenres } from "../utils/genrespage";

const GenresView = props => {
  const [selectedGenres, setGenres] = useState(new Map());
  genres.map(genre => selectedGenres.set(genre, false));

  const history = useHistory();

  const submitGenre = async event => {
    event.preventDefault();

    let trueGenres = [];

    for (const [key, value] of selectedGenres.entries()) {
      if (value) trueGenres.push(key);
    }

    const response = await saveGenres(trueGenres);
    console.log(response);
    history.push('/calculatebooks');
  };

  const useStyles = makeStyles(theme => ({
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

  const handleChange = event => {
    let genre = event.currentTarget.value;
    let selected = selectedGenres.get(genre);
    setGenres(selectedGenres.set(genre, !selected));
    let newStyles = !selected ? classes.selectedButton : classes.unselectedButton;
    event.currentTarget.className = `MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary ${newStyles}`;
  };

  return (
    <div className = "Register">
        <div className="EasyReadTitle">
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
              onClick={handleChange}
              className={classes.unselectedButton}
              variant="contained"
              color="primary"
              value={genre}
            >
              {genre}
            </Button>{' '}
          </span>
          ))}
        </div>
        <div className = "EndButton">
          <Button
            className={classes.button2}
            type="submit"
            variant="contained"
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