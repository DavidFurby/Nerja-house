import classes from "../styles/Home.module.css";

export default function Introduction({ image }) {
  return (
    <div
      style={{
        backgroundImage: "url(" + image.image + ")",
        height: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        borderRadius: "25px 25px 25px 25px",
        margin: "25px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center"
      }}
    >
      <div>
        <h1 className={classes.title}>Casa Anna</h1>
      </div>
    </div>
  );
}
