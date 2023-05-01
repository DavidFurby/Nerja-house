import React, { useState } from "react";

interface Form {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

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
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          ></input>

          <br />
          <input
            style={{ width: "12.2em" }}
            placeholder="Mail"
            value={form.email}
            onChange={(event) =>
              setForm({ ...form, email: event.target.value })
            }
          ></input>
        </div>
        <div>
          <input
            style={{ width: "25em" }}
            placeholder="Ämne"
            value={form.subject}
            onChange={(event) =>
              setForm({ ...form, subject: event.target.value })
            }
          ></input>
          <br />
          <textarea
            style={{ width: "25em", height: "100px", resize: "none" }}
            placeholder="Meddelande"
            value={form.message}
            onChange={(event) =>
              setForm({ ...form, message: event.target.value })
            }
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
          Skicka
        </button>
      </form>
    </div>
  );
}
