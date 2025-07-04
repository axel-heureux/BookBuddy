import './HomePage.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import InformativeCard from './InfoCard';

function HomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    axios
      .get('http://localhost:5000/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUsername(res.data.user?.username || '');
      })
      .catch(() => setUsername(''));
  }, []);

  return (
<>
  <Navbar />
  <div className="homepage-welcome">
    {username && <h1>Bienvenue, {username} !</h1>}
    <h2>Explorez, suivez et gérez votre bibliothèque personnelle en toute simplicité. Commencez votre aventure littéraire dès maintenant 📚✨</h2>
  </div>
  <hr className="custom-hr" />


  <div className="card-container">
    <InformativeCard
      title="Suivi de lecture"
      text="Ajoutez vos livres lus, suivez votre progression et partagez vos découvertes littéraires."
    />
    <InformativeCard
      title="Bibliothèque personnelle"
      text="Gérez votre collection de livres, découvrez de nouveaux titres et explorez des genres variés."
    />
    <InformativeCard
      title="Communauté"
      text="Rejoignez une communauté passionnée de lecteurs, partagez vos avis et trouvez des recommandations."
    />
  </div>
</>
  );
}

export default HomePage;