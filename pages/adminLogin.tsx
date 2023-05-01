import { useRouter } from "next/router";
import { useState } from "react";
import { UseAuth } from "../utils/firebase/context/AuthContext";

interface loginForm {
  email: string,
  password: string
}
const AdminLogin = () => {
  const { login } = UseAuth();

  const router = useRouter();
  let [loginInfo, setLoginInfo] = useState<loginForm>({ email: "", password: "" });
  let [loading, setLoading] = useState<boolean>(false);

  const checkPassword = () => {
    if (loginInfo.password.length < 8)
      return { valid: false, msg: "Lösenordet måste vara minst 8 tecken" };
    return { valid: true };
  };

  const submitLogin = async (e: { preventDefault: () => void }) => {
    setLoading(true);
    e.preventDefault();
    const passwordResult = checkPassword();
    if (!passwordResult.valid) {
      setLoading(false);
      alert(passwordResult.msg);
    } else {
      try {
        const UserCredentials = {
          email: loginInfo.email,
          password: loginInfo.password,
        };
        const response = await login(
          UserCredentials.email.trim(),
          UserCredentials.password.trim()
        );
        setLoading(false);
        setLoginInfo({ email: "", password: "" });
        if (response !== null) {
          router.push("/admin");
        } else {
          alert(response);
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
        <div style={{ padding: "6rem", height: "90vh", display: "flex",  justifyContent:"center"}}>
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
                value={loginInfo.email}
                onChange={(email) =>
                  setLoginInfo((info) => ({
                    ...info,
                    email: email.target.value,
                  }))
                }
              />
            </label>
            <label>
              password:
              <br />
              <input
                type="password"
                value={loginInfo.password}
                onChange={(password) =>
                  setLoginInfo((info) => ({
                    ...info,
                    password: password.target.value,
                  }))
                }
              />
            </label>
            <button className="button" type="submit">Logga in</button>
          </form>
        </div>
      ) : null}
    </>
  );
};

export default AdminLogin;
