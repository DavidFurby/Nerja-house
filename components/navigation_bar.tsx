import Link from "next/link";
import classes from "../styles/Nav.module.css";
import { UseAuth } from "../utils/firebase/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import ScreenContext from "../utils/context/ScreenContext";
const DrawerButton = ({ sidebar, setSidebar }) => {
  return (
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
  );
};
const NavBar = ({ isMobile, sidebar, setSidebar }) => {
  let { currentUser, logout } = UseAuth();

  const handleNavigation = (
    sidebarState: boolean | ((prevState: boolean) => boolean)
  ) => {
    setSidebar(sidebarState);
  };
  return (
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
        <NavItem name={"Nerja hus"} href={"/"} />
        <NavItem name={"Se tider"} href={"/booking"} />
        <NavItem name={"Läs mer"} href={"/readMore"} />
      </ul>
      {currentUser ? (
        <ul>
          <NavItem name={"Admin"} href={"/admin"} />
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
  );
  function NavItem({ name, href }) {
    return (
      <li
        className={classes.linkButton}
        onClick={() => handleNavigation(!sidebar)}
      >
        <Link href={href}>{name}</Link>
      </li>
    );
  }
};
const NavigationBar = () => {
  const isMobile = useContext(ScreenContext);
  let [sidebar, setSidebar] = useState(false);
  return (
    <>
      {isMobile ? (
        <DrawerButton sidebar={sidebar} setSidebar={setSidebar} />
      ) : null}
      <NavBar sidebar={sidebar} setSidebar={setSidebar} isMobile={isMobile} />
    </>
  );
};

export default NavigationBar;
