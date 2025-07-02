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
        // Si favorites est un tableau d'objets { book: {...}, ... }
        // alors il faut afficher book.titre et book.auteur
        const favs = res.data.user?.favorites || [];
        setFavorites(favs);
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
          {favorites.map((fav, idx) => (
            <li key={fav._id || idx} className="favorite-item">
              <strong>{fav.book?.titre || fav.titre || 'Titre inconnu'}</strong>
              <div className="favorite-author">Auteur : {fav.book?.auteur || fav.auteur || 'Inconnu'}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorite;