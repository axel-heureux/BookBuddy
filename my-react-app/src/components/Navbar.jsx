import { Link } from 'react-router-dom';


function Navbar() {
  return (
    <nav className="homepage-navbar">
      <Link to="/" className="nav-link">Accueil</Link>
      <Link to="/dashboard" className="nav-link">Tableau de bord</Link>
      <Link to="/favorites" className="nav-link">Favoris</Link>
      <Link to="/rewards" className="nav-link">Récompenses</Link>
      <Link to="/profile" className="nav-link">Profil</Link>
    </nav>
  );
}

export default Navbar;
