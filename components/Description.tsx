import React from "react";
import classes from "../styles/Home.module.css";
const Description = ({ descriptions }) => {
  return (
    <div className={classes.description}>
      {descriptions.map((e: any) => {
        return (
          <section key={e.id}>
            <img src={e.icon} style={{ opacity: "0.6" }} alt={e.id} />
            <p>{e.text}</p>
            <br />
          </section>
        );
      })}
    </div>
  );
};
export default Description;
