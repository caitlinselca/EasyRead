import React, {  } from "react";
import "./CalculateBooks.css";

const CalculateBooksView = props => {

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
          <div className="spinninggear"></div>
        <br></br>
        <br></br>
        </p>
      </div>
    </div>
  );
};

export default CalculateBooksView;