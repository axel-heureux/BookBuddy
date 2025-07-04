import { useEffect, useState } from 'react';
import axios from 'axios';
import './Rewards.css';
import Navbar from './Navbar'; // Ajout de l'import

function Rewards() {
  const [rewards, setRewards] = useState([]);
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
        setRewards(res.data.user?.rewards || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="rewards-page">
      <Navbar /> {/* Affichage de la navbar */}
      <div className="rewards-container">
        <h2 className="rewards-title">Mes badges débloqués</h2>
        {rewards.length === 0 ? (
          <p className="rewards-message">Aucun badge débloqué pour le moment.</p>
        ) : (
          <ul className="rewards-list">
            {rewards.map((badge, idx) => (
              <li key={badge._id || idx} className="rewards-item">
                <strong>{badge.nom || 'Badge'}</strong>
                <div className="rewards-description">{badge.description || ''}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div> // ✅ Fermeture de la div manquante ici
  );
}

export default Rewards;
