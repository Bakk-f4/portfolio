/// STYLE ///
import '../my-css/box-component.css';
import '../my-css/fonts/fonts.css';

/// COMPONENTS ///
import Container from 'react-bootstrap/Container';
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

    return (
        <Container style={boxStyle}>
            <div className="home-layout">
                <div className="home-title" id="title-presentation">
                    <h1>hi.</h1>
                    <h1>i&apos;m</h1>
                    <h1>Ion</h1>
                </div>
                <div className="home-image" id="box-image">
                    <Image src={require('../img/me-black-and-white.jpg')} rounded id="homepage-image" />
                </div>
                <div className="home-desc" id="row-presentation">
                    <div id="presentation">
                        <p>
                            <br />
                            I&apos;m a computer science student at Unige.<br /><br />
                            Passionate about the magic behind how things work.<br /><br />
                            Currently in the process of graduating,<br />
                            I try to capture every facet<br />
                            of the vast computer science landscape.<br />
                        </p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default BoxComponent;
