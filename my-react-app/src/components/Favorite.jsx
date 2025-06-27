import { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorite.css';

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setFavorites(res.data.user?.favorites || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="favorite-container">
      <h2 className="favorite-title">Mes livres favoris</h2>
      {favorites.length === 0 ? (
        <p className="favorite-message">Aucun livre favori pour le moment.</p>
      ) : (
        <ul className="favorite-list">
          {favorites.map((book, idx) => (
            <li key={book._id || idx} className="favorite-item">
              <strong>{book.titre || 'Titre inconnu'}</strong>
              <div>Auteur : {book.auteur || 'Inconnu'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorite;