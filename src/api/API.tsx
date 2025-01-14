import { useState, useEffect } from 'react';
import searchGithub from './API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = (initialSearchTerm: string = 'john') => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm); // Example search term

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        setLoading(true);
        const result = await searchGithub(searchTerm) as unknown as Candidate[];
        setCandidates(result); // Set the search results to state
      } catch (err) {
        setError('Failed to fetch candidates');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) {
      fetchCandidates();
    }
  }, [searchTerm]); // Run the search every time the searchTerm changes

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update the search term
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Candidate Search</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a GitHub user"
        style={styles.searchInput}
      />
      {candidates.length > 0 ? (
        <ul style={styles.candidateList}>
          {candidates.map((candidate, index) => (
            <li key={index} style={styles.candidateItem}>
              <img src={candidate.avatar_url} alt={candidate.login} style={styles.candidateAvatar} />
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer" style={styles.candidateLink}>
                {candidate.login}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No candidates found.</p>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  searchInput: {
    padding: '0.8rem',
    fontSize: '1rem',
    width: '100%',
    maxWidth: '500px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginBottom: '1rem',
  },
  candidateList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '500px',
  },
  candidateItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '1rem',
    padding: '1rem',
    backgroundColor: '#ffffff',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  candidateAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
  },
  candidateLink: {
    color: '#007bff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  candidateLinkHover: {
    textDecoration: 'underline',
  },
};




export default CandidateSearch;

