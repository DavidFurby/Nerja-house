import React from "react";

const Description = ({ desc }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr)",
        alignItems: "start",
        textAlign: "center"
      }}
    >
      {desc.map((e: any) => {
        return (
          <>
            <p>{e}</p>
            <br />
          </>
        );
      })}
    </div>
  );
};
export default Description;
