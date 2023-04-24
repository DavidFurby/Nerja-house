import classes from "../styles/nav_bar.module.css";
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
    sidebarState: boolean | ((prevState: boolean) => boolean),
    section: undefined
  ) => {
    if (section != null) {
      const target = document.querySelector(`#${section}`);
      target.scrollIntoView({ behavior: "smooth" });
    }
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
          style={{ top: "0", left: "0" }}
          onClick={() => setSidebar(!sidebar)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      ) : null}

      <ul>
        <NavItem name={"Casa Ana"} section={"introduction"} />
        <NavItem name={"Bilder"} section={"cards"} />
        <NavItem name={"Se tider"} section={"booking"} />
        <NavItem name={"Läs mer"} section={"readMore"} />
        <NavItem name={"Kontakta oss"} section={"contact"} />

      </ul>
    </nav>
  );
  function NavItem({ name, section }) {
    return (
      <li
        className={classes.linkButton}
        onClick={() => handleNavigation(!sidebar, section)}
      >
        <a> {name}</a>
      </li>
    );
  }
};
const NavigationBar = () => {
  const isMobile = useContext(ScreenContext);
  let [sidebar, setSidebar] = useState(false);
  return isMobile !== null ? (
    <>
      {isMobile ? (
        <DrawerButton sidebar={sidebar} setSidebar={setSidebar} />
      ) : null}
      <NavBar sidebar={sidebar} setSidebar={setSidebar} isMobile={isMobile} />
    </>
  ) : null;
};

export default NavigationBar;
