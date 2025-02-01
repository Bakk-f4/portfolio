/// COMPONENTS ///
import { Container, Row, Col, Form, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


import { useState } from 'react';
import { Snake } from 'react-snake-lib';

export const Contacts = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    //Snake minigame variables
    const [gameKey, setGameKey] = useState(0);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [noWall, setNoWall] = useState(false);

    const onScoreChange = (newScore) => {
        setScore(newScore);
        if (newScore > maxScore) {
            setMaxScore(newScore);
        }
    };

    const onGameOver = () => {
        setGameKey(prevKey => prevKey + 1); // Cambia la chiave per forzare il riavvio
    };

    //on game over reset the score
    const onGameStart = () => {
        setScore(0);
    };


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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Message:', message);
        // Qui inserire logica per invio messaggio
    };

    return (
        <Container style={boxStyle}>
            <Row >
                <div id='title-presentation'>
                    <h1>contact me</h1>
                </div>
            </Row>
            <Row id='presentation'>
                <Col>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Inserisci la tua email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage" className="mt-3">
                            <Form.Label>Messaggio</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="Scrivi il tuo messaggio"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">Invia</Button>
                    </Form>
                </Col>
                <Col id='box-image'>
                    <Row >
                        <Row style={{ width: '85%' }}>
                            <Col style={{ textAlign: 'left', fontSize: '20px', fontWeight: 'bold' }}>
                                score: {score}
                            </Col>
                            <Col style={{ textAlign: 'right', fontSize: '20px', fontWeight: 'bold' }}>
                                max: {maxScore}
                            </Col>
                        </Row>
                    </Row>


                    <Snake
                        key={gameKey}
                        onScoreChange={onScoreChange}
                        onGameOver={onGameOver}
                        onGameStart={onGameStart}
                        width="500px"
                        height="500px"
                        bgColor="silver"
                        innerBorderColor="#b1b0b0"
                        snakeSpeed={90}
                        borderColor="black"
                        snakeColor="#3e3e3e"
                        snakeHeadColor="#1a1a1a"
                        appleColor="tomato"
                        borderRadius={5}
                        snakeHeadRadius={1}
                        borderWidth={0}
                        shakeBoard={true}
                        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
                        size={16}
                        startGameText="Start Game"
                        startButtonStyle={{
                            color: "white",
                            padding: "6px 20px",
                            backgroundColor: "#1a1a1a",
                            borderRadius: "10px",
                            fontSize: "17px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                        startButtonHoverStyle={{
                            backgroundColor: "#4f4d4d"
                        }}
                        noWall={noWall}
                    />
                    <Col style={{ fontSize: '20px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center' }}>
                        walls:
                        <Form.Check
                            type="switch"
                            id="noWallSwitch"
                            checked={noWall}
                            onChange={() => setNoWall(prevState => !prevState)}
                            style={{ marginLeft: '10px', marginTop: '10px' }} // Aggiungi un po' di spazio tra il testo e lo switch
                        />
                    </Col>


                </Col>
            </Row >
        </Container >
    );
}