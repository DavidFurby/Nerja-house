import React from "react";
import classes from "../styles/Home.module.css";

export default function FrontPageCards({ images }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr)",
      }}
    >
      {images.map((card: any) => {
        return (
          <div
            data-aos="fade-up"
            className={classes.card}
            key={card.id}
            style={{
              backgroundImage: "url(" + card.image + ")",
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
