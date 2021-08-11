import Link from "next/link";
import classes from "../styles/Nav.module.css";
import { UseAuth } from "../utils/firebase/context/AuthContext";
const NavigationBar = () => {
  let { currentUser, logout } = UseAuth();

  return (
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
            <button className="button" onClick={() => logout()}>Logga ut</button>
          </li>{" "}
        </ul>
      ) : null}
    </nav>
  );
};

export default NavigationBar;
