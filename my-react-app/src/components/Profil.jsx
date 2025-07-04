import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profil.css';
import Navbar from './Navbar'; // Ajoute l'import de la navbar

function Profil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .get('http://localhost:5000/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        'http://localhost:5000/users/logout',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      // ignore error
    }
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <div>Chargement...</div>;
  if (!user) return <div>Utilisateur non connecté.</div>;

  return (
  <div>
      <Navbar /> {/* Affiche la navbar ici */}
    <div className="profil-container">
      <h2 className="profil-title">Mon profil</h2>
      <div className="profil-info"><strong>ID :</strong> {user._id}</div>
      <div className="profil-info"><strong>Pseudonyme :</strong> {user.username}</div>
      <div className="profil-info"><strong>Email :</strong> {user.email}</div>
      <div className="profil-info"><strong>Points :</strong> {user.points}</div>
      <div className="profil-info"><strong>Date de création :</strong> {new Date(user.createdAt).toLocaleString()}</div>
      <div className="profil-info"><strong>Dernière modification :</strong> {new Date(user.updatedAt).toLocaleString()}</div>
      <div className="profil-info"><strong>Livres lus :</strong> {user.booksRead?.length || 0}</div>
      <div className="profil-info"><strong>Badges :</strong> {user.rewards?.length || 0}</div>
      <div className="profil-info"><strong>Favoris :</strong> {user.favorites?.length || 0}</div>
      {/* Affichage détaillé des livres lus */}
      {user.booksRead && user.booksRead.length > 0 && (
        <div className="profil-info">
          <strong>Liste des livres lus :</strong>
          <ul>
            {user.booksRead.map((item, idx) => (
              <li key={item._id || idx}>
                {item.book?.titre || item.book || 'Livre'} — Progression : {item.progress || 0}%
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Affichage détaillé des favoris */}
      {user.favorites && user.favorites.length > 0 && (
        <div className="profil-info">
          <strong>Favoris :</strong>
          <ul>
            {user.favorites.map((fav, idx) => (
              <li key={fav._id || idx}>
                {fav.book?.titre || fav.book || 'Livre favori'}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Affichage détaillé des badges */}
      {user.rewards && user.rewards.length > 0 && (
        <div className="profil-info">
          <strong>Badges :</strong>
          <ul>
            {user.rewards.map((badge, idx) => (
              <li key={badge._id || idx}>
                {badge.nom || badge._id || 'Badge'}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Bouton de déconnexion tout en bas */}
      <button
        style={{
          marginTop: 30,
          background: '#ef4444',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          padding: '0.5rem 1.2rem',
          cursor: 'pointer',
          width: '100%'
        }}
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
    </div>
  </div>
  );
}

export default Profil;