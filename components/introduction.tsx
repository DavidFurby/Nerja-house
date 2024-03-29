import classes from "../styles/Home.module.css";

export default function Introduction(image: { image: string; }) {
  return (
    <div
      data-aos="fade-in"
      className={classes.introduction}
      style={{
        backgroundImage: "url(" + image.image + ")",
      }}
    >
      <div className={classes.introductionContent}>
        <h1 className={classes.title}>Casa Anna</h1>
      </div>
    </div>
  );
}
