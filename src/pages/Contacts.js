/// COMPONENTS ///
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { useState, useRef, useEffect } from 'react';
import { Snake } from 'react-snake-lib';
import { db } from '../firebase';
import { ref, push, get, query, orderByChild, limitToLast } from 'firebase/database';

const fetchLeaderboard = async () => {
    const q = query(ref(db, 'snakeScores'), orderByChild('score'), limitToLast(10));
    const snapshot = await get(q);
    if (!snapshot.exists()) return [];
    const entries = [];
    snapshot.forEach(child => { entries.push(child.val()); });
    return entries.sort((a, b) => b.score - a.score);
};

const saveScore = async (nickname, score) => {
    await push(ref(db, 'snakeScores'), {
        nickname,
        score,
        date: new Date().toLocaleDateString()
    });
    return fetchLeaderboard();
};

export const Contacts = () => {

    // Contact variables
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    // Snake minigame variables
    const [gameKey, setGameKey] = useState(0);
    const [score, setScore] = useState(0);
    const [maxScore, setMaxScore] = useState(0);
    const [noWall, setNoWall] = useState(false);

    // Nickname + leaderboard
    const [nickname, setNickname] = useState('');
    const [nicknameConfirmed, setNicknameConfirmed] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const currentScoreRef = useRef(0);

    useEffect(() => {
        fetchLeaderboard().then(setLeaderboard);
    }, []);

    const onScoreChange = (newScore) => {
        setScore(newScore);
        currentScoreRef.current = newScore;
        if (newScore > maxScore) {
            setMaxScore(newScore);
        }
    };

    const onGameOver = () => {
        if (nicknameConfirmed && currentScoreRef.current > 0) {
            saveScore(nickname, currentScoreRef.current)
                .then(setLeaderboard)
                .catch(err => console.error('Score save failed:', err));
        }
        setGameKey(prevKey => prevKey + 1);
    };

    //on game over reset the score
    const onGameStart = () => {
        setScore(0);
        currentScoreRef.current = 0;
    };

    const confirmNickname = () => {
        if (nickname.trim()) setNicknameConfirmed(true);
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
        // Insert sending mail logic
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
                                placeholder="insert your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formMessage" className="mt-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                placeholder="insert your max score"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">Send</Button>
                    </Form>

                    <div className="mt-4">
                        <h5 style={{ color: '#f2f2f2', marginBottom: '0.75em' }}>🏆 leaderboard</h5>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #444', color: '#aaa' }}>
                                    <th style={{ padding: '4px 8px', textAlign: 'left' }}>#</th>
                                    <th style={{ padding: '4px 8px', textAlign: 'left' }}>nickname</th>
                                    <th style={{ padding: '4px 8px', textAlign: 'right' }}>score</th>
                                    <th style={{ padding: '4px 8px', textAlign: 'right' }}>date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ padding: '8px', textAlign: 'center', color: '#555' }}>no scores yet</td>
                                    </tr>
                                ) : leaderboard.map((entry, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #333', color: idx === 0 ? '#4ade80' : '#ccc' }}>
                                        <td style={{ padding: '4px 8px' }}>{idx + 1}</td>
                                        <td style={{ padding: '4px 8px' }}>{entry.nickname}</td>
                                        <td style={{ padding: '4px 8px', textAlign: 'right', fontWeight: 'bold' }}>{entry.score}</td>
                                        <td style={{ padding: '4px 8px', textAlign: 'right', color: '#888' }}>{entry.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Col>
                <Col id='box-image'>
                    {!nicknameConfirmed ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1em' }}>
                            <h5 style={{ color: '#f2f2f2' }}>enter nickname to play</h5>
                            <Form.Control
                                type="text"
                                placeholder="your nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && confirmNickname()}
                                maxLength={20}
                                style={{ maxWidth: '220px', textAlign: 'center' }}
                            />
                            <Button
                                onClick={confirmNickname}
                                disabled={!nickname.trim()}
                                style={{ backgroundColor: '#1a1a1a', border: '1px solid #555', borderRadius: '10px', padding: '6px 24px' }}
                            >
                                Play
                            </Button>
                        </div>
                    ) : (
                        <div style={{ width: '100%' }}>
                            <Row style={{ width: '100%', marginBottom: '4px' }}>
                                <Col style={{ fontSize: '14px', color: '#aaa' }}>
                                    playing as <strong style={{ color: '#f2f2f2' }}>{nickname}</strong>
                                    <Button
                                        size="sm"
                                        variant="link"
                                        onClick={() => setNicknameConfirmed(false)}
                                        style={{ color: '#888', fontSize: '12px', padding: '0 6px' }}
                                    >change</Button>
                                </Col>
                            </Row>
                            <Row style={{ width: '100%' }}>
                                <Col style={{ textAlign: 'left', fontSize: '20px', fontWeight: 'bold' }}>
                                    score: {score}
                                </Col>
                                <Col style={{ textAlign: 'right', fontSize: '20px', fontWeight: 'bold' }}>
                                    max: {maxScore}
                                </Col>
                            </Row>
                            <Snake
                                key={gameKey}
                                onScoreChange={onScoreChange}
                                onGameOver={onGameOver}
                                onGameStart={onGameStart}
                                width="90%"
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
                                    style={{ marginLeft: '10px', marginTop: '10px' }}
                                />
                            </Col>
                        </div>
                    )}
                </Col>
            </Row >
        </Container >
    );
}