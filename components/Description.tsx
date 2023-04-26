import React from "react";
const Description = ({ desc }) => {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr)",
        textAlign: "center",
      }}
    >
      {desc.map((e: any) => {
        return (
          <div key={e.id}>
            <img src={e.icon} style={{opacity: "0.6"}} alt={e.id}/>
            <p>{e.text}</p>
            <br />
          </div>
        );
      })}
    </section>
  );
};
export default Description;
