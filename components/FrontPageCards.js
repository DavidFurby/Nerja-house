import React from "react";
import classes from "../styles/Home.module.css";

export default function FrontPageCards({images}) {

  return (
    <div className={classes.container}>
  
      {images.map((card, index) => {
        return (
          <div
            data-aos="fade-up"
            className={classes.card}
            key={index}
            style={{
              backgroundImage: "url(" + card.image + ")",
              alignSelf: index % 2 !== 0 ? "flex-end" : "flex-start",
            }}
          >
            <div className={classes.cardContent}>
              <h1 className={classes.title}>{card.name}</h1>
              <p className={classes.subText}>{card.subText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
