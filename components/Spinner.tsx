import React from "react";
import classes from "../styles/Loading.module.css"
function Spinner() {
  return (
    <div className={classes.sunContainer}>
      <div className={classes.sun}></div>
    </div>
  );
}

export default Spinner;
