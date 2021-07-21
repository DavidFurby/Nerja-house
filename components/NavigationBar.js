import Link from "next/link";
const NavigationBar = () => {
    return (
            <nav className="navbar d-flex justify-content-end">
                <div className="nav">
                    <Link href="/">Om mig</Link>
                    <Link href="/experience">Erfarenheter</Link>
                </div>
            </nav>
    );
};

export default NavigationBar;
