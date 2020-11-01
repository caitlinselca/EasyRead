import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import isEmpty from "is-empty";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import "./Genres.css";
import { fontFamily } from "@material-ui/system";
const fetch = require('node-fetch');

const RegisterView = props => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const history = useHistory();

  const registerUser = event => {
    event.preventDefault();
    props.registerUser(state, history);
  };

  const handleChange = event => {
    setState({ ...state, [event.target.id]: event.target.value });
  };

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


  const [horrorStatus, setHorrorStatus] = useState(false);
  const [thrillerStatus, setThrillerStatus] = useState(false);
  const [romanceStatus, setRomanceStatus] = useState(false);
  const [dramaStatus, setDramaStatus] = useState(false);
  const [actionStatus, setActionStatus] = useState(false);
  const [fantasyStatus, setFantasyStatus] = useState(false);
  const [comedyStatus, setComedyStatus] = useState(false);
  const [mysteryStatus, setMysteryStatus] = useState(false);
  const [sciFiStatus, setSciFiStatus] = useState(false);
  const [fictionStatus, setFictionStatus] = useState(false);
  const [nonFictionStatus, setNonFictionStatus] = useState(false);
  const [educationalStatus, setEducationalStatus] = useState(false);
  const [crimeStatus, setCrimeStatus] = useState(false);
  const [youngAdultStatus, setYoungAdultStatus] = useState(false);
  const [childrensBooksStatus, setChildrensBooksStatus] = useState(false);

  return (
    <div className = "Register">
            <div className="EasyReadTitle">
        {/* <label>
            Easy Read
        </label> */}
      </div>
    <div className = "RegisterContainer">
      <form onSubmit={registerUser} autoComplete="off">
      <div className = "EasyReadRegisterTitle">
      <label>
          Select Your Favorite Genres!
      </label>
      </div>
        <br></br>
        <div className = "ButtonAlignment">
          <Button 
            onClick={() => setHorrorStatus(!horrorStatus)}
            className= {horrorStatus ? classes.selectedButton : classes.unselectedButton }
           // type="submit"
            variant="contained"
            color="primary" 
          >
            Horror
          </Button> {' '}
        {/* </div>
        <div className = "Button"> */}
          <Button
            onClick={() => setThrillerStatus(!thrillerStatus)}
            className= {thrillerStatus ? classes.selectedButton : classes.unselectedButton }
            // type="submit"
            variant="contained"
            color="primary"
          >
            Thriller
          </Button> {' '}
        {/* </div> */}
        {/* <div className = "Button"> */}
          <Button
           onClick={() => setRomanceStatus(!romanceStatus)}
           className= {romanceStatus ? classes.selectedButton : classes.unselectedButton }
            // type="submit"
            variant="contained"
            color="primary"
          >
            Romance
          </Button> {' '}
        </div>
        <div className = "ButtonAlignment">
          <Button
            onClick={() => setDramaStatus(!dramaStatus)}
            className= {dramaStatus ? classes.selectedButton : classes.unselectedButton }
            // type="submit"
            variant="contained"
            color="primary"
          >
            Drama
          </Button> {' '}
          <Button
            onClick={() => setActionStatus(!actionStatus)}
            className= {actionStatus ? classes.selectedButton : classes.unselectedButton }
            // type="submit"
            variant="contained"
            color="primary"
          >
            Action
          </Button> {' '}
          <Button
             onClick={() => setFantasyStatus(!fantasyStatus)}
             className= {fantasyStatus ? classes.selectedButton : classes.unselectedButton }
            // type="submit"
            variant="contained"
            color="primary"
          >
            Fantasy
          </Button>
        <div className = "Button">
          <Button
             onClick={() => setComedyStatus(!comedyStatus)}
             className= {comedyStatus ? classes.selectedButton : classes.unselectedButton }
            // type="submit"
            variant="contained"
            color="primary"
          >
            Comedy
          </Button> {' '}
          <Button
            onClick={() => setMysteryStatus(!mysteryStatus)}
            className= {mysteryStatus ? classes.selectedButton : classes.unselectedButton }
            type="submit"
            variant="contained"
            color="primary"
          >
            Mystery
          </Button> {' '}
          <Button
             onClick={() => setSciFiStatus(!sciFiStatus)}
             className= {sciFiStatus ? classes.selectedButton : classes.unselectedButton }
           // type="submit"
            variant="contained"
            color="primary"
          >
            Sci-Fi
          </Button> {' '}
          <Button
             onClick={() => setFictionStatus(!fictionStatus)}
             className= {fictionStatus ? classes.selectedButton : classes.unselectedButton }
           // type="submit"
            variant="contained"
            color="primary"
          >
            Fiction
          </Button> {' '}
          <Button
             onClick={() => setNonFictionStatus(!nonFictionStatus)}
             className= {nonFictionStatus ? classes.selectedButton : classes.unselectedButton }
          //  type="submit"
            variant="contained"
            color="primary"
          >
            Non-Fiction
          </Button> {' '}
          <Button
             onClick={() => setEducationalStatus(!educationalStatus)}
             className= {educationalStatus ? classes.selectedButton : classes.unselectedButton }
           // type="submit"
            variant="contained"
            color="primary"
          >
            Educational
          </Button> {' '}
          <Button
             onClick={() => setCrimeStatus(!crimeStatus)}
             className= {crimeStatus ? classes.selectedButton : classes.unselectedButton }
           // type="submit"
            variant="contained"
            color="primary"
          >
            Crime
          </Button> {' '}
          <Button
             onClick={() => setYoungAdultStatus(!youngAdultStatus)}
             className= {youngAdultStatus ? classes.selectedButton : classes.unselectedButton }
           // type="submit"
            variant="contained"
            color="primary"
          >
            Young Adult
          </Button> {' '}
          <Button
             onClick={() => setChildrensBooksStatus(!childrensBooksStatus)}
             className= {childrensBooksStatus ? classes.selectedButton : classes.unselectedButton }
            // type="submit"
            variant="contained"
            color="primary"
          >
            Children's Books
          </Button> {' '}
        </div>
        </div>
        <div className = "EndButton">
          <Button
            className={classes.button2}
            // type="submit"
            variant="contained"
            //color="primary"
            href="/subjects"
          >
            Next Page
          </Button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default RegisterView;