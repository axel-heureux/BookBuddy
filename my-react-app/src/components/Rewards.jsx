import { useEffect, useState } from 'react';
import axios from 'axios';
import './Rewards.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

function Reward() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:5000/rewards')
      .then(res => {
        console.log(res.data); 
        setRewards(res.data.rewards || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="rewards-container">
      <h2 className="rewards-title">Badges disponibles</h2>
      {rewards.length === 0 ? (
        <p className="rewards-message">Aucun badge pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
          {rewards.map((badge, idx) => (
            <li key={badge._id || idx} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: '1rem 2rem', minWidth: 120, textAlign: 'center' }}>
              <strong>{badge.nom || 'Badge'}</strong>
              <div>{badge.description || ''}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Reward;