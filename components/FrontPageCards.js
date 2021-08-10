import React from "react";
import classes from "../styles/Home.module.css";
import { UseFrontPage } from "../utils/firebase/context/FrontPageContext";

export default function FrontPageCards() {
  const { frontPageImages } = UseFrontPage();

  return (
    <div className={classes.container}>
      <h1
        data-aos="fade-in"
        data-aot-once="true"
        data-aos-delay="500"
        data-aos-duration="2000"
      >
        Stort hus i Nerja - nära Burriana
      </h1>
      {frontPageImages.map((card, index) => {
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
              <h2 className={classes.title}>{card.name}</h2>
              <p className={classes.subText}>{card.subText}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
