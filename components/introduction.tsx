import classes from "../styles/Home.module.css";

export default function Introduction({ image }) {
  console.log(image);
  return (
    <div
      style={{
        backgroundImage: "url(" + image.image + ")",
        justifyContent: "flex-end",
        height: "120vh",
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div>
        <h1 className={classes.title}>Nerja hus</h1>
        <p className={classes.subText}>UnderText</p>
      </div>
    </div>
  );
}
