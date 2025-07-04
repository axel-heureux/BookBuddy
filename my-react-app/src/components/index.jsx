import './HomePage.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

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
        {username ? (
          <h1>Bienvenue, {username} !</h1>
        ) : (
          <h1>Explorez, suivez et gérez votre bibliothèque personnelle en toute simplicité. Commencez votre aventure littéraire dès maintenant 📚✨</h1>
        )}
      </div>
    </>
  );
}

export default HomePage;