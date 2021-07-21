import Link from "next/link";
import navStyles from "../styles/Nav.module.css"
const NavigationBar = () => {
    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href="/">Nerja hus</Link>
                </li>
            
                <li>
                    <Link href="/book">Boka</Link>
                </li>
                <li>
                    <Link href="/readMore">Läs mer</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;
