import { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';

function Dashboard() {
  const [booksRead, setBooksRead] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Récupère le profil utilisateur pour avoir username ET livres lus
    axios
      .get('http://localhost:5000/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUsername(res.data.user?.username || '');
        setBooksRead(res.data.user?.booksRead || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>
        {username ? `Livres lus par ${username}` : 'Vos livres lus'}
      </h2>
      {booksRead.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Aucun livre lu pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {booksRead.map((item, idx) => (
            <li key={item.book?._id || idx} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
              <strong>{item.book?.titre || 'Titre inconnu'}</strong>
              <div>Auteur : {item.book?.auteur || 'Inconnu'}</div>
              <div>Progression : {item.progress || 0}%</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;