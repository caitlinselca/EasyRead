import React, {  } from "react";
import "./CalculateBooks.css";

const CalculateBooksView = props => {

  setTimeout(() => {
    window.location.href = "/HomePage"
  }, 10000); // 1000 = 1 second, we can change it to any specific time.

  return (
    <div className="CalculateBooks">
      <br></br>
      <br></br>
      <div className="CalculateBooksContainer">
        <p>
        <h1>Great! Thanks for all the info.</h1>
        <br></br><br></br>
        <h1>Give us a second while we calculate the best books for you</h1>
        <br></br><br></br>
        <h1>If you’ve made an error or would like different suggestions, we recommend selecting your preferences again.</h1>
        <br></br>

            <img className="spinninggear" src= {require("../static/Spinner-1s-200px-2.gif")}></img>
        <br></br>
        <br></br>
        </p>
      </div>
    </div>
  );
};

export default CalculateBooksView;