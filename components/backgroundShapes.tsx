import classes from "../styles/background_shapes.module.css";
const BackgroundShapes = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className={classes.firstShape} />
      <div className={classes.secondShape} />
    </div>
  );
};

export default BackgroundShapes;
