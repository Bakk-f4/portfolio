/// DATA ///
import { Octokit } from "octokit";

/// STYLE ///
import '../my-css/fonts/fonts.css';
import '../my-css/projects.css';

/// COMPONENTS ///
import RowCardComponent from '../components/RowCardComponent';
import { CodeSnippetPopup } from '../components/CodeSnippetPopup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const octokit = new Octokit();

const iconsLinks = {
    "cplusplus": "https://isocpp.org/",
    "javascript": "https://www.javascript.com/",
    "python": "https://www.python.org/",
    "react": "https://reactjs.org/",
    "html5": "https://developer.mozilla.org/en-US/docs/Web/HTML",
    "css3": "https://developer.mozilla.org/en-US/docs/Web/CSS",
    "nodejs": "https://nodejs.org/",
    "git": "https://git-scm.com/",
    "github": "https://github.com/",
    "docker": "https://www.docker.com/",
    "bootstrap": "https://getbootstrap.com/",
    "unity": "https://unity.com/",
};

export const Projects = () => {
    const [repos, setRepos] = useState([]);
    const [activeSnippet, setActiveSnippet] = useState(null);

    const handleIconClick = (icon) => {
        setActiveSnippet(prev => prev === icon ? null : icon);
    };

    useEffect(() => {
        octokit.request('GET /users/Bakk-f4/repos', {
            headers: { 'X-GitHub-Api-Version': '2022-11-28' }
        }).then(res => setRepos(res.data));
    }, []);

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
                    <Row>
                        <div id='title-presentation'>
                            <h1>projects</h1>
                        </div>
                    </Row>
                    <Row>
                        <Row xs={1} md={3} className="g-4">
                            {repos.map((repo, idx) => (
                                <Col key={idx}>
                                    <RowCardComponent
                                        repoOwner={repo.owner.login}
                                        repoName={repo.name}
                                        lastModification={repo.updated_at.slice(0, -10)}
                                        link_to={repo.html_url}
                                        codeLang={repo.language}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </Col>
                <Col className="scrollable-icons-container">
                    <Row xs={4} md={3} className="gy-5 icons-container">
                        {Object.keys(iconsLinks).map((icon, idx) => (
                            <Col key={idx} className="d-flex justify-content-center mb-4 icon-box">
                                <button
                                    type="button"
                                    className={`icon-link icon-btn${activeSnippet === icon ? ' icon-btn--active' : ''}`}
                                    onClick={() => handleIconClick(icon)}
                                >
                                    <img
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
                                        alt={icon}
                                        width="50"
                                        height="50"
                                    />
                                    <span className="tooltip">{icon}</span>
                                </button>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
            <AnimatePresence>
                {activeSnippet && (
                    <CodeSnippetPopup
                        key={activeSnippet}
                        lang={activeSnippet}
                        onClose={() => setActiveSnippet(null)}
                    />
                )}
            </AnimatePresence>
        </Container>
    );
}
