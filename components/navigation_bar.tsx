import classes from "../styles/nav_bar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import ScreenContext from "../utils/context/ScreenContext";
import { NextRouter, useRouter } from "next/router";
import { UseAuth } from "../utils/firebase/context/AuthContext";
import Link from "next/link";
const DrawerButton = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <button
      title="open"
      style={{
        display: sidebarOpen ? "none" : "block",
        position: "fixed",
        zIndex: "1000",
      }}
      className="button"
      onClick={() => toggleSidebar()}
    >
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
};
const NavBar = ({ isMobile, toggleSidebar, sidebar }) => {
  let { currentUser, logout } = UseAuth();

  const router: NextRouter = useRouter();
  const { asPath } = router;

  const handleNavigation = (
    sidebarState: boolean | ((prevState: boolean) => boolean),
    section: undefined
  ) => {
    if (asPath == "/") {
      if (section != null) {
        const target: Element = document.querySelector(`#${section}`);
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      router.push("/");
    }

    toggleSidebar();
  };

  return (
    <nav
      className={
        isMobile
          ? `${classes.navMobile} ${sidebar ? classes.open : ""}`
          : classes.nav
      }
    >
      {isMobile && (
        <button
          style={{
            alignSelf: "start",
          }}
          title="close"
          className="button"
          onClick={() => toggleSidebar()}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}

      <ul>
        <NavItem name={"Casa Anna"} section={"introduction"} />
        <NavItem name={"Bilder"} section={"cards"} />
        <NavItem name={"Läs mer"} section={"readMore"} />
        <NavItem name={"Se tider"} section={"booking"} />
        <NavItem name={"Kontakta oss"} section={"contact"} />
      </ul>

      <ul style={{ visibility: currentUser ? "visible" : "hidden" }}>
        <li>
          <Link
            onClick={() => toggleSidebar()}
            href={"/admin"}
            className={classes.linkButton}
          >
            Admin
          </Link>
        </li>
        <li>
          <button onClick={() => logout() && toggleSidebar()}>Logga ut</button>
        </li>
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
  const isMobile: boolean = useContext(ScreenContext);
  let [sidebar, setSidebar] = useState<boolean>(false);
  const toggleSidebar = () => {
    setSidebar(!sidebar);
  };
  return isMobile !== null ? (
    <>
      {isMobile ? (
        <DrawerButton toggleSidebar={toggleSidebar} sidebarOpen={sidebar} />
      ) : null}
      <NavBar
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
        sidebar={sidebar}
      />
    </>
  ) : null;
};

export default NavigationBar;
