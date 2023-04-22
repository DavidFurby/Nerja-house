import React from "react";
import classes from "../styles/WaterAnimation.module.css"
export default function Water() {
  
  return (
    <div className={classes.waveDiv}>
      <div className={classes.wave}/>
      <div className={classes.wave}/>
    </div>
  );
}
