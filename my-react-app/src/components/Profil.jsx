import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profil.css';

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
    <div className="profil-container">
      <h2 className="profil-title">Mon profil</h2>
      <div className="profil-info"><strong>Pseudonyme :</strong> {user.username}</div>
      <div className="profil-info"><strong>Email :</strong> {user.email}</div>
      {/* Ajoute d'autres infos si besoin */}
    </div>
  );
}

export default Profil;