import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/users/login', formData);
      localStorage.setItem('token', res.data.token); // Stocke le token d'abord
      alert('Connexion réussie !');
      navigate('/'); // Puis redirige
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur de connexion');
    }
  };

  return (
    <div className="login-form-container flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>
        <input
          name="email"
          type="email"
          placeholder="Adresse mail"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded"
          required
        />
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <button type="submit" className="bg-black text-white font-bold py-2 px-6 rounded w-full">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default LoginForm;