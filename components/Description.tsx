import React from "react";
const Description = ({descriptions}) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr)",
        textAlign: "center",
      }}
    >
      {descriptions.map((e: any) => {
        return (
          <section key={e.id}>
            <img src={e.icon} style={{ opacity: "0.6" }} alt={e.id} />
            <p>{e.text}</p>
            <br />
          </section>
        );
      })}
    </div>
  );
};
export default Description;
