import React from "react";

const Description = ({ desc }) => {
  return (
    <div>
      <p>
        {desc.slice(0, 1)}
        <br />
        <br />
        {desc.slice(1, 2)}
        <br />
        <br />
        {desc.slice(2, 3)}
        <br />
        <br />
        {desc.slice(3, 4)}
        <br />
        <br />
        {desc.slice(4, 5)}
        <br />
        <br />
        {desc.slice(5, 6)}
        <br />
        <br />
        {desc.slice(6, 7)}
        <br />
        <br />
        {desc.slice(7, 8)}
        <br />
        <br />
        {desc.slice(8, 9)}
   
      </p>
    </div>
  );
};
export default Description;
