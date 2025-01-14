import { Link, useLocation } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();

  return (
    <nav style={{
      display: 'flex',
      padding: '1rem',
      backgroundColor: '#333',
      color: '#fff',
      width: '100%', 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      zIndex: 1000, 
    }}>
      <ul style={{
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'row', 
      }}>
        <li style={{ marginRight: '1rem' }}>
          <Link to="/" style={{
            color: location.pathname === '/' ? '#007bff' : '#fff',
            textDecoration: 'none',
          }}>Home</Link>
        </li>
        <li>
          <Link to="/candidates" style={{
            color: location.pathname === '/candidates' ? '#007bff' : '#fff',
            textDecoration: 'none',
          }}>Potential Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;