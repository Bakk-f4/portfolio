import { BrowserRouter as Router, Routes as RouterRoutes, Route } from 'react-router-dom';
import { Projects } from './pages/Project';
import { Contacts } from './pages/Contacts';
import Career from './pages/Career';

export const Routes = () => (
  <Router>
    <RouterRoutes>
      <Route path="/" element={<Projects />} />
      <Route path="/Contacts" element={<Contacts />} />
      <Route path="/career" element={<Career />} />
    </RouterRoutes>
  </Router>
);
