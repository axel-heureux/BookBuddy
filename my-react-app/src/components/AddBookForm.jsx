// Nouveau fichier : src/components/AddBookForm.jsx
import { useState } from 'react';
import axios from 'axios';

function AddBookForm({ onBookAdded }) {
  const [titre, setTitre] = useState('');
  const [auteur, setAuteur] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/books', {
        titre,
        auteur,
        description,
      });
      setTitre('');
      setAuteur('');
      setDescription('');
      if (onBookAdded) onBookAdded();
      alert('Livre ajouté !');
    } catch (err) {
      alert('Erreur lors de l\'ajout du livre');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Ajouter un livre à la bibliothèque</h3>
      <div>
        <label>Titre&nbsp;
          <input value={titre} onChange={e => setTitre(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>Auteur&nbsp;
          <input value={auteur} onChange={e => setAuteur(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>Description&nbsp;
          <input value={description} onChange={e => setDescription(e.target.value)} />
        </label>
      </div>
      <button type="submit" style={{ marginTop: 10, background: '#10b981', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>
        Ajouter le livre
      </button>
    </form>
  );
}

export default AddBookForm;