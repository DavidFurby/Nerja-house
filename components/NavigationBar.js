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
  let [activeNav, setActiveNav] = useState("home");
  const getMobileState = () => {
    let mobileTemp = window.matchMedia("(max-width: 600px)");
    if (mobileTemp) {
      setIsMobile(mobileTemp.matches);
    }
  };
  const handleNavigation = (sidebarState, activeNav) => {
    setActiveNav(activeNav);
    setSidebar(sidebarState);
  };
  useEffect(() => {
    getMobileState();
  }, []);
  return (
    <>
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

      <nav
        className={
          isMobile
            ? sidebar
              ? `${classes.navMobile} ${classes.showSidebar}`
              : `${classes.navMobile}`
            : classes.nav
        }
      >
        {isMobile ? (
          <button
            className="button"
            style={{ position: "absolute", top: "0", left: "0" }}
            onClick={() => setSidebar(!sidebar)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        ) : null}

        <ul>
          <li
            className={classes.linkButton}
            onClick={() => handleNavigation(!sidebar, "home")}
          >
            <Link href="/">Nerja hus</Link>
          </li>

          <li
            className={classes.linkButton}
            onClick={() => handleNavigation(!sidebar, "bookings")}
          >
            <Link href="/booking">Se tider</Link>
          </li>
          <li
            className={classes.linkButton}
            onClick={() => handleNavigation(!sidebar, "readMore")}
          >
            <Link href="/readMore">Läs mer</Link>
          </li>
        </ul>
        {currentUser ? (
          <ul>
            <li
              className={classes.linkButton}
              onClick={() => handleNavigation(!sidebar, "admin")}
            >
              <Link href="/admin">admin-sida</Link>
            </li>
            <li>
              <button
                className="button"
                onClick={() => logout() && setSidebar(!sidebar)}
              >
                Logga ut
              </button>
            </li>
          </ul>
        ) : null}
      </nav>
    </>
  );
};

export default NavigationBar;
