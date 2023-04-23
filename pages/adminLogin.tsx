import { useRouter } from "next/router";
import { useState } from "react";
import Spinner from "../components/spinner";
import { UseAuth } from "../utils/firebase/context/AuthContext";

const AdminLogin = () => {
  const { login } = UseAuth();

  const router = useRouter();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);

  const checkPassword = () => {
    if (password.length < 8)
      return { valid: false, msg: "Lösenordet måste vara minst 8 tecken" };
    return { valid: true };
  };

  const submitLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const passwordResult = checkPassword();
    if (!passwordResult.valid) {
      setLoading(false);
      alert("password not valid");
      return;
    } else {
      try {
        const UserCredentials = {
          email: email,
          password: password,
        };
        const response = await login(
          UserCredentials.email.trim(),
          UserCredentials.password.trim()
        );
        setLoading(false);

        if (response && response.success) {
          router.push("/admin");
        } else {
          setLoading(false);
        }
      } catch (e) {
        e;
      }
    }
  };


  return (
    <>
      {!loading ? (
        <div style={{padding: "6rem", height: "90vh"}}>
          <form
            onSubmit={submitLogin}
            style={{
              display: "flex",
              flexFlow: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "left",
            }}
          >
            <label>
              email:
              <br />
              <input
                type="email"
                value={email}
                onChange={(email) => setEmail(email.target.value)}
              />
            </label>
            <label>
              password:
              <br />
              <input
                type="password"
                value={password}
                onChange={(password) => setPassword(password.target.value)}
              />
            </label>
            <input className="button" type="submit" value="Logga in" />
          </form>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default AdminLogin;
