import classes from "../styles/backgroundShapes.module.css";
const BackgroundShapes = () => {
  return (
    <div style={{overflow: "hidden"}}>
      <div className={classes.firstShape} />
      <div className={classes.secondShape} />
    </div>
  );
};

export default BackgroundShapes;
