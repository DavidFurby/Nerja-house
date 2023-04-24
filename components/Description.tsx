import React from "react";

const Description = ({ desc }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr)",
        textAlign: "center",
      }}
    >
      {desc.map((e: any) => {
        return (
          <div key={e} style={{padding: "25px"}}>
            <p>{e}</p>
            <br />
          </div>
        );
      })}
    </div>
  );
};
export default Description;
