import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import { UseAuth } from "../utils/firebase/context/AuthContext";
const NavigationBar = () => {
  let { currentUser, logout } = UseAuth();

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Nerja hus</Link>
        </li>

        <li>
          <Link href="/booking">Boka</Link>
        </li>
        <li>
          <Link href="/readMore">Läs mer</Link>
        </li>
      </ul>
      {currentUser ? (
        <ul>
          <li>
            <Link href="/admin">admin</Link>
          </li>
          <li>
            <button onClick={() => logout()}>Logga ut</button>
          </li>{" "}
        </ul>
      ) : null}
    </nav>
  );
};

export default NavigationBar;
