import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Themes.css";
import labels from "../static/labels"
import { saveThemes } from "../utils/utils"


const ThemesView = props => {
  const [selectedThemes, setThemes] = useState(new Map());
  labels[0].themes.map(theme => selectedThemes.set(theme, false));

  const history = useHistory();

  const submitThemes = async event => {
    event.preventDefault();

    let themes = [];

    for(const [key, value] of selectedThemes.entries()){
      if(value) themes.push(key);
    }

    const response = await saveThemes(themes);
    console.log(response);
  }

  
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
    let theme = event.currentTarget.value;
    let selected = selectedThemes.get(theme);
    setThemes(selectedThemes.set(theme, !selected));
    let newStyles = !selected ? classes.selectedButton : classes.unselectedButton;
    event.currentTarget.className = `MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary ${newStyles}`;
  };

  return (
    <div className = "Register">
            <div className="EasyReadTitle">
        {/* <label>
            Easy Read
        </label> */}
      </div>
    <div className = "RegisterContainer">
      <form onSubmit={submitThemes} autoComplete="off">
      <div className = "EasyReadRegisterTitle">
      <label>
          Select Your Favorite Themes!
      </label>
      </div>
        <br></br>
        <div className = "ButtonAlignment">
          {labels[0].themes.map((theme) => (
            <span>
              <Button
                onClick={handleChange}
                className={classes.unselectedButton}
                variant="contained"
                color="primary"
                value={theme}
              >
                {theme}
              </Button> {' '}
            </span>
          ))}
        </div>
        <div className = "EndButton">
          <Button
            className={classes.button2}
            type="submit"
            variant="contained"
            //color="primary"
            // href="/CalculateBooks"
          >
            Next Page
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ThemesView;