import React, {  } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import {BrowserRouter as Router, Link} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import "./Welcome.css";


const WelcomeView = props => {

    const history = useHistory();

    const useStyles = makeStyles(theme => ({
        button: {
            width: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "30%",
            marginTop: ".5%"
        }
    }));

    const classes = useStyles();

    return (
        <div className="Welcome">
            <br></br>
            <br></br>
            <div className="WelcomeContainer">
                <p>
                <br></br>
                <h1>Welcome to Easy Read!</h1>
                <br></br>
                <h2>Our Service is very simple. All you have to do is select your preferred genres, themes,
                authors, time periods, places, and age ranges.</h2> 
                <h2>Then we will recommend books within those preferences.*</h2> 
                <h2>Want horror books that include plot twists? We will recommend the 
                best books tailored just for you.</h2>
                {/* <br></br> */}
                <br></br>
                <br></br>
                <Router>
                <Button className={classes.button} type="submit" variant="contained" onClick={()=>{history.push('/genres')}}>
                    Let's Try This!
                </Button>
                </Router>
                <br></br>
                <br></br>
                <br></br>
                <subfont>*The more unique preferences, the more limited our recommendations will be.</subfont>
                </p>
            </div>
        </div>
    );
};

export default WelcomeView;