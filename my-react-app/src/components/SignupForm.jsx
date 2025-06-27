import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignupForm.css';
import bookSignup from '../assets/images/bookSignup.jpg';

function SignupForm() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/users', formData);
      alert('Inscription réussie !');
      navigate('/login'); // Redirige vers LoginForm.jsx (chemin à adapter selon ta route)
    } catch (err) {
      alert('Erreur : ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="signup-form-container flex">
      <div className="signup-form-left w-1/2 bg-black text-white p-8">
        <h2 className="text-center text-2xl font-bold mb-6">Formulaire d’inscription</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            name="username"
            placeholder="Pseudonyme"
            onChange={handleChange}
            className="w-full p-3 shadow"
            required
          />
          <input
            name="email"
            placeholder="Adresse mail"
            onChange={handleChange}
            className="w-full p-3 shadow"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full p-3 shadow"
            required
          />
          <button type="submit" className="bg-white text-black font-bold py-2 px-6 rounded">
            Valider
          </button>
        </form>
      </div>
      <div className="signup-form-right w-1/2 relative">
        <img src={bookSignup} alt="Books" className="signup-form-img h-full w-full object-cover brightness-50" />
        <p
          className="absolute inset-0 flex items-center justify-center text-white text-lg font-semibold"
          style={{ pointerEvents: 'none' }}
        >
          Créez un compte pour commencer à suivre vos lectures et gagner des badges !
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
