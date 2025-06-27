import { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

function Dashboard() {
  const [books, setBooks] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // Récupère le profil utilisateur pour obtenir ses livres ajoutés
    axios
      .get('http://localhost:5000/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUsername(res.data.user?.username || '');
        // On suppose que le backend renvoie un tableau booksRead ou booksAdded
        setBooks(res.data.user?.booksRead || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>
        {username ? `Livres ajoutés par ${username}` : 'Vos livres'}
      </h2>
      {books.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Aucun livre ajouté pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((item, idx) => (
            <li key={item.book?._id || idx} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
              <strong>{item.book?.titre || 'Titre inconnu'}</strong>
              <div>Auteur : {item.book?.auteur || 'Inconnu'}</div>
              <div>Progression : {item.progress || 0}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;