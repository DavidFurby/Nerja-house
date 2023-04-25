import classes from "../styles/Home.module.css";

export default function Introduction({ image }) {
  return (
    <div
      style={{
        backgroundImage: "url(" + image.image + ")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50rem",
      }}
    >
      <div>
        <h1 className={classes.title}>Casa Anna</h1>
      </div>
    </div>
  );
}
