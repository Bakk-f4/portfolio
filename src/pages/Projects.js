/// STYLE ///
import '../my-css/fonts/fonts.css';
import '../my-css/projects.css';

/// COMPONENTS ///
import CardComponent from '../components/CardComponent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
/// COMPONENTS ///

export const Projects = () => {
    const boxStyle = {
        position: 'relative',
        margin: 'auto',
        marginTop: '1.5em',
        marginBottom: '1.5em',
        backgroundColor: '#212529',
        color: '#F2F2F2',
        padding: '2em',
        borderRadius: '5px',
        width: '80%',
        opacity: '0.8',
        justifyContent: 'center',
    };

    return (
        <Container style={boxStyle}>
            <Row>
                <Col>
                    <Row >
                        <div id='title-presentation'>
                            <h1>projects</h1>
                        </div>
                    </Row>
                    <Row>
                        <Row xs={1} md={3} className="g-4">
                            {Array.from({ length: 9 }).map((_, idx) => (
                                <Col key={idx}>
                                    <CardComponent />
                                </Col>
                            ))}
                            <a>https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#get-all-repository-topics </a>
                        </Row>
                    </Row>
                </Col>
                <Col id='box-image'>
                    <p>
                        <br />
                        Here i can put some cards with the coding languages i know
                    </p>
                </Col>
            </Row>
        </Container>
    );
}