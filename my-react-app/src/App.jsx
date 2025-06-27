import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/index';
import Dashboard from './components/dashboard';
import Favorite from './components/Favorite';
import Rewards from './components/Rewards'; // Assurez-vous d'avoir ce composant
import Profil from './components/Profil';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/favorites" element={<Favorite />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/profile" element={<Profil />} />
        {/* Routes pour l'inscription et la connexion */}
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Ajoute d'autres routes si besoin */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;