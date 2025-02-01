/// COMPONENTS ///
import { Container, Row, Col, Form, Button } from 'react-bootstrap';


import { useState } from 'react';

export const Contacts = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

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
                    <p>
                        <br />
                        {
                            //Qui aggiungere snake minigame dopo che l utente clicka su play al centro del riquadro
                        }
                    </p>
                </Col>
            </Row >
        </Container >
    );
}