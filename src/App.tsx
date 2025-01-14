import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CandidateSearchPage from './pages/CandidateSearch';
import PotentialCandidates from './pages/Potentialcandidates';

const App: React.FC = () => {
  return (
    <Router>      
      <main>
        <Routes>
          <Route path="/" element={<CandidateSearchPage />} />
          <Route path="/potential-candidates" element={<PotentialCandidates />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;