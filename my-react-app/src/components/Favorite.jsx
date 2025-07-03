import { useEffect, useState } from 'react';
import axios from 'axios';
import './Favorite.css';


function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    fetchFavorites();
    // eslint-disable-next-line
  }, []);

  const fetchFavorites = () => {
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
        const favs = res.data.user?.favorites || [];
        setFavorites(favs);
        setUserId(res.data.user?._id); // <-- récupère l'id utilisateur
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleRemoveFavorite = async (fav) => {
    const token = localStorage.getItem('token');
    const bookId = fav.book?._id || fav.book || fav._id;
    try {
      await axios.delete(`http://localhost:5000/users/${userId}/favorites/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter(item => (item.book?._id || item.book || item._id) !== bookId));
    } catch (err) {
      alert('Erreur lors de la suppression du favori');
    }
  };
  

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
              <button
                style={{ marginTop: 8, background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer' }}
                onClick={() => handleRemoveFavorite(fav)}
              >
                Retirer des favoris
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorite;