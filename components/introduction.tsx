import classes from "../styles/Home.module.css";

export default function Introduction({ image }) {
  return (
    <div
      data-aos="fade-in"
      className={classes.introduction}
      style={{
        backgroundImage: "url(" + image.image + ")",
      }}
    >
      <div>
        <h1 className={classes.title}>Casa Anna</h1>
      </div>
    </div>
  );
}
