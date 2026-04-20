/// STYLE ///
import '../my-css/navbar.css';

/// COMPONENTS ///
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="bg-dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={require('../img/bakk-logo.png')} alt="bakk-logo" width="150rem" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} eventKey={2} to="/Projects">
                            Projects
                        </Nav.Link>
                        <Nav.Link as={Link} eventKey={3} to="/career">
                            Career
                        </Nav.Link>
                        <Nav.Link as={Link} eventKey={4} to="/Contacts">
                            Contact
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default NavbarComponent;