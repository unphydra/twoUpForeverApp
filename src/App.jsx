import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './index.css';
import AccessoryView from './pages/AccessoryView';
import Home from './pages/Home';

function Navbar() {
  return (
    <header style={{
      padding: '1.5rem',
      borderBottom: '1px solid var(--border-color)',
      backgroundColor: 'rgba(15, 17, 21, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0, flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
          Two_Up_<span style={{ color: 'var(--accent)' }}>Forever</span>
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link to="/" style={{ fontWeight: 500 }} className="nav-link">Home</Link>
          <Link to="/accessories" style={{ fontWeight: 500 }} className="nav-link">Accessories</Link>
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/accessories/*" element={<AccessoryView />} />
          </Routes>
        </main>
        <footer style={{
          padding: '2rem',
          textAlign: 'center',
          borderTop: '1px solid var(--border-color)',
          marginTop: 'auto',
          color: 'var(--text-muted)'
        }}>
          <p>&copy; {new Date().getFullYear()} two_up_forever. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
