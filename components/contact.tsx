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
    <div
      style={{
        backgroundColor: "#C8C6C5",
        width: "100%",
      }}
    >
      <form
        style={{
          padding: "25px",
          display: "grid",
          justifyContent: "center",
          textAlign: "center",
        }}
        onSubmit={handleSubmit}
      >
        <h1>Kontakta oss</h1>
        <div style={{ display: "flex" }}>
          <input
            style={{ width: "12.5em" }}
            placeholder="Namn"
            value={name}
            onChange={(event) => setName(event.target.value)}
          ></input>

          <br />
          <input
            style={{ width: "12.2em" }}
            placeholder="Mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          ></input>
        </div>
        <div>
          <input
            style={{ width: "25em" }}
            placeholder="Ämne"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
          ></input>
          <br />
          <textarea
            style={{ width: "25em", height: "100px", resize: "none" }}
            placeholder="Meddelande"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>
        <button
          style={{
            width: "12.5rem",
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          Send
        </button>
      </form>
    </div>
  );
}
