import React from "react";
import classes from "../styles/Home.module.css";

export default function FrontPageCards({ images, isMobile }) {
  return (
    <div className={classes.container}>
      {images.map((card: any, index: number) => {
        return (
          <div
            data-aos="fade-up"
            className={classes.card}
            key={index}
            style={{
              backgroundImage: "url(" + card.image + ")",
              alignSelf: !isMobile
                ? index % 2 !== 0
                  ? "flex-end"
                  : "flex-start"
                : null,
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
