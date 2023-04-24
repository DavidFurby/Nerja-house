import React, { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };
  return (
    <div style={{ backgroundColor: " rgb(177, 176, 176)" }}>
      <form
        style={{
          padding: "25px",
          display: "grid",
          justifyContent: "center",
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <div style={{ display: "flex" }}>
          <input
            style={{ width: "200px" }}
            placeholder="Namn"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>

          <br />
          <input
            style={{ width: "200px" }}
            placeholder="Mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <br />
        <div>
          <input
            style={{ width: "400px" }}
            placeholder="Ämne"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          ></input>
          <br />
          <textarea
            style={{ width: "400px", height: "100px", resize: "none" }}
            placeholder="Meddelande"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>
        <button>Send</button>
      </form>
    </div>
  );
}
