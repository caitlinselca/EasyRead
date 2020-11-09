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
                <br></br><br></br>
                <h2>Our Service is very simple, you select your preferred genre, 
                combinations of genres, favorite author, age range, topics or subjects.</h2> 
                <h2>Then we recommend our top three books within those preferred preferences.*</h2> 
                <h2>For example, you want a horror book that involves drama by Stephen King, we will recommend three of the 
                best books with those preferences.</h2>
                <br></br>
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
                <br></br>
                <subfont>*The more unique preferences, the more limited our recommendations will be.</subfont>
                </p>
            </div>
        </div>
    );
};

export default WelcomeView;