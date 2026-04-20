import careerData from '../data/career.json';
import Timeline from '../components/career/Timeline';
import '../my-css/career.css';

const Career = () => (
  <div className="career-page">
    <div className="career-container">
      <h1 className="career-title">career</h1>
      <Timeline items={careerData} />
    </div>
  </div>
);

export default Career;
