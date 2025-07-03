import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className={location.pathname === '/dashboard' ? 'active' : ''}>
          <Link to="/dashboard">Tableau de bord</Link>
        </li>
        <li className={location.pathname === '/favorites' ? 'active' : ''}>
          <Link to="/favorites">Favoris</Link>
        </li>
        <li className={location.pathname === '/rewards' ? 'active' : ''}>
          <Link to="/rewards">Récompenses</Link>
        </li>
        <li className={location.pathname === '/profil' ? 'active' : ''}>
          <Link to="/profil">Profil</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;