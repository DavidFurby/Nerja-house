import Link from "next/link";
import classes from "../styles/Nav.module.css";
import { UseAuth } from "../utils/firebase/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";

const NavigationBar = () => {
  let { currentUser, logout } = UseAuth();
  let [sidebar, setSidebar] = useState(false);
  let [isMobile, setIsMobile] = useState();

  const getMobileState = () => {
    let mobileTemp = window.matchMedia("(max-width: 600px)");
    if (mobileTemp) {
      setIsMobile(mobileTemp.matches);
    }
  };
  useEffect(() => {
    getMobileState();
  }, []);
  return (
    <div>
      {isMobile ? (
        <button
          style={{
            display: sidebar ? "none" : "block",
            position: "fixed",
            zIndex: "1000",
          }}
          className="button"
          onClick={() => setSidebar(!sidebar)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      ) : null}

      {isMobile ? (
        <nav
          className={classes.nav}
          style={{ display: sidebar ? "block" : "none" }}
        >
          <button
            className="button"
            style={{ position: "absolute", right: "0" }}
            onClick={() => setSidebar(!sidebar)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <ul>
            <li className={classes.linkButton}>
              <Link href="/">Nerja hus</Link>
            </li>

            <li className={classes.linkButton}>
              <Link href="/booking">Boka</Link>
            </li>
            <li className={classes.linkButton}>
              <Link href="/readMore">Läs mer</Link>
            </li>
          </ul>
          {currentUser ? (
            <ul>
              <li className={classes.linkButton}>
                <Link href="/admin">admin-sida</Link>
              </li>
              <li>
                <button className="button" onClick={() => logout()}>
                  Logga ut
                </button>
              </li>
            </ul>
          ) : null}
        </nav>
      ) : (
        <nav className={classes.nav}>
          <ul>
            <li className={classes.linkButton}>
              <Link href="/">Nerja hus</Link>
            </li>

            <li className={classes.linkButton}>
              <Link href="/booking">Boka</Link>
            </li>
            <li className={classes.linkButton}>
              <Link href="/readMore">Läs mer</Link>
            </li>
          </ul>
          {currentUser ? (
            <ul>
              <li className={classes.linkButton}>
                <Link href="/admin">admin-sida</Link>
              </li>
              <li>
                <button className="button" onClick={() => logout()}>
                  Logga ut
                </button>
              </li>
            </ul>
          ) : null}
        </nav>
      )}
    </div>
  );
};

export default NavigationBar;
