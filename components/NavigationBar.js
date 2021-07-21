import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap"
const NavigationBar = () => {
    return (
        <Navbar>
            <Container>
                <Navbar.Brand><Link href="/">Nerja hus</Link></Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Item>
                    <Link href="/book">Boka</Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Link href="/readMore">Läs mer</Link>
                    </Nav.Item>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
