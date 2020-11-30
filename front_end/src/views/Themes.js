import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import "./Themes.css";
import labels from "../static/labels"
import { saveThemes } from '../utils/utils'

const q = {
  NONE: 0,
  OR: 1,
  AND: 2
}

const ThemesView = props => {
  const [ors, setORs] = useState([]);
  const [ands, setANDs] = useState([]);
  const [selectedThemes, setThemes] = useState(new Map());
  
  const history = useHistory();
  
  useEffect(() => {
    labels[0].themes.map(theme => selectedThemes.set(theme, q.NONE));
  }, [])

  const submitThemes = async event => {
    event.preventDefault();

    let themes = {
      ands: [],
      ors: []
    };

    if(ors.length == 0 && ands.length == 0){
      for(const [key, value] of selectedThemes.entries()){
        themes.ors.push(key);
      }
    }else{
      themes.ands = ands;
      themes.ors = ors;
    }
    
    const response = await saveThemes(themes);
    console.log(response);
    window.location.href = "/";
  }

  const useStyles = makeStyles(theme => ({
    unselectedButton: {
      color: "#fff",
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
    },
    query: {
      fontSize: 12
    }
  }));
  
  const classes = useStyles();
  
  const handleChange = event => {
    let theme = event.currentTarget.value;
    let selected = selectedThemes.get(theme);
    switch(selected){
      case q.NONE:
        setThemes(selectedThemes.set(theme, q.OR));
        break;
      case q.OR:
        setThemes(selectedThemes.set(theme, q.AND));
        break;
      case q.AND:
        setThemes(selectedThemes.set(theme, q.NONE));
        break;
    }
    // Update query
    const themes = getThemes();
    setORs(Array.from(themes.filter(value => selectedThemes.get(value) == q.OR)));
    setANDs(Array.from(themes.filter(value => selectedThemes.get(value) == q.AND)));
  };

  const getThemes = () => {
    let themes = [];
    for(const [key, value] of selectedThemes.entries()){
      if(value > q.NONE) themes.push(key);
    }
    return themes;
  }

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
        <Box className={classes.query} width={1}>
          <div>ORs: | {ors.map(value => (
              <span>{value} | </span>
            ))}
          </div>
          <div>ANDs: | {ands.map(value => (
              <span>{value} | </span>
            ))}
          </div>
        </Box>
        <div className = "ButtonAlignment">
          {labels[0].themes.map((theme) => (
            <span>
              <Button
                onClick={handleChange}
                className={selectedThemes.get(theme) > q.NONE ? classes.selectedButton : classes.unselectedButton}
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