/// DATA ///
import { Octokit } from "octokit";
import git_file from '../github_token.json';

/// STYLE ///
import '../my-css/fonts/fonts.css';
import '../my-css/projects.css';

/// COMPONENTS ///
import RowCardComponent from '../components/RowCardComponent';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

// Octokit.js
// https://github.com/octokit/core.js#readme

// Specify the path to the text file
const insert_token_github = git_file.token.toString();

const octokit = new Octokit({
    auth: insert_token_github
})

const github_request = await octokit.request('GET /user/repos', {
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
})


// external dev icons links
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
                            {Array.from({ length: github_request.data.length - 2 }).map((_, idx) => (
                                <Col key={idx}>
                                    <RowCardComponent
                                        repoOwner={github_request.data[idx].owner.login}
                                        repoName={github_request.data[idx].name}
                                        lastModification={github_request.data[idx].updated_at.slice(0, -10)}
                                        link_to={github_request.data[idx].html_url}
                                        codeLang={github_request.data[idx].language}
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
                                <a href={iconsLinks[icon]} target="_blank" rel="noopener noreferrer" className="icon-link">
                                    <img
                                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}/${icon}-original.svg`}
                                        alt={icon}
                                        width="50"
                                        height="50"
                                    />
                                    <span className="tooltip">{icon}</span>
                                </a>
                            </Col>
                        ))}
                    </Row>
                </Col>

            </Row >
        </Container >
    );
}