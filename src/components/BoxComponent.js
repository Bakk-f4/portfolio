/// STYLE ///
import '../my-css/box-component.css';
import '../my-css/fonts/fonts.css';

/// COMPONENTS ///
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const BoxComponent = () => {
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
    /*
    return (
        <Container style={boxStyle}>
            <Row>
                <Col xs={12} md={6}>
                    <Row xs={1}>
                        <div id='title-presentation'>
                            <h1>hi.</h1>
                            <h1>i’m</h1>
                            <h1>Ion</h1>
                        </div>
                    </Row>
                    <Row xs={12}>
                        <div>
                            <p id='presentation'>
                                <br></br>
                                i’m a computer science student at Unige. <br></br>
                                passionate about the magic behind how things work,<br></br>
                                currently in the process of graduating, <br></br>
                                i try to capture every facet <br></br> of the vast computer science landscape.
                            </p>
                        </div>
                    </Row>
                </Col>
                <Col id='box-image' xs={12} md={6}>
                    <Image src={require('../img/me-black-and-white.jpg')} rounded width={'94%'} />
                </Col>
            </Row>
        </Container >
    );
    */

    return (
        <Container style={boxStyle}>
            <Row>
                <Col>
                    <Row >
                        <div id='title-presentation'>
                            <h1>hi.</h1>
                            <h1>i’m</h1>
                            <h1>Ion</h1>
                        </div>
                    </Row>
                    <Row id='row-presentation'>
                        <div id='presentation'>
                            <p>
                                <br />
                                I’m a computer science student at Unige.<br />
                                Passionate about the magic behind how things work,<br />
                                Currently in the process of graduating,<br />
                                I try to capture every facet<br />
                                of the vast computer science landscape.<br />
                            </p>
                        </div>
                    </Row>
                </Col>
                <Col id='box-image'>
                    <Image src={require('../img/me-black-and-white.jpg')} rounded id='image-id' />
                </Col>
            </Row>
        </Container>
    );

};

export default BoxComponent;
