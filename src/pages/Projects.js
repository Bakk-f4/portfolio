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
                                        ultimaModifica={github_request.data[idx].updated_at}
                                        link_to={github_request.data[idx].html_url}
                                        codeLang={github_request.data[idx].language}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Row>
                </Col>
                <Col id='box-image'>
                    <p>
                        <br />
                        //QUI AGGIUNGERE PREVIEW DELLE CARDS CON MOUSEHOVER
                        https://swiperjs.com/react
                        https://codesandbox.io/p/devbox/swiper-effect-cards-react-y6dn3i?file=%2Fsrc%2FApp.jsx
                        Here i can put some cards with the coding languages i know
                    </p>
                </Col>
            </Row >
        </Container >
    );
}