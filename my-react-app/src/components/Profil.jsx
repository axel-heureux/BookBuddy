import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profil.css'; // Assurez-vous d'avoir ce fichier CSS pour le style

function Profil() {
  const [user, setUser] = useState(null);
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
        setUser(res.data.user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement...</div>;

  if (!user) return <div>Utilisateur non connecté.</div>;

  return (
    <div style={{ maxWidth: 500, margin: '2rem auto', padding: '2rem', background: '#fafafa', borderRadius: 12 }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Mon profil</h2>
      <div><strong>Pseudonyme :</strong> {user.username}</div>
      <div><strong>Email :</strong> {user.email}</div>
      {/* Ajoute d'autres infos si besoin */}
    </div>
  );
}

export default Profil;