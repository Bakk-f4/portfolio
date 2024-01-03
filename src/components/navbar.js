/// STYLE ///
import '../my-css/navbar.css';

/// COMPONENTS ///
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">
                    <img src={require('../img/bakk-logo.png')} alt="bakk-logo" width="150rem" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link href="#Home">Home</Nav.Link>
                        <Nav.Link eventKey={2} href="#Projects">
                            Projects
                        </Nav.Link>
                        <Nav.Link eventKey={3} href="#Contact">
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavbarComponent;