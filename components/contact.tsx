import React, { useRef } from "react";
import * as emailjs from "emailjs-com";
interface Form {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const form = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    emailjs
      .sendForm(
        "service_qpx3kpi",
        "template_8cl2wep",
        form.current,
        "XxswbXg2wEYUUrAq2"
      )
      .then(
        function() {
          form.current.reset();
          alert("Meddelandet har skickats");
        },
        function() {
          alert("Meddelandet kunde inte skickas");
        }
      );
  };
  return (
    <div
      style={{
        backgroundColor: "#C8C6C5",
        width: "100%",
      }}
    >
      <form
        ref={form}
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
            style={{ width: "10rem" }}
            placeholder="Namn"
            name="user_name"
          ></input>

          <br />
          <input
            style={{ width: "10rem" }}
            placeholder="Mail"
            name="user_email"
          ></input>
        </div>
        <div>
          <input
            style={{ width: "20rem" }}
            placeholder="Ämne"
            name="subject"
          ></input>
          <br />
          <textarea
            style={{ width: "20rem", height: "100px", resize: "none" }}
            placeholder="Meddelande"
            name="message"
          ></textarea>
        </div>
        <button
          title="send"
          style={{
            width: "12.5rem",
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          Skicka
        </button>
      </form>
    </div>
  );
}
