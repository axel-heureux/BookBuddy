import { useEffect, useState } from 'react';
import axios from 'axios';
import BookList from './BookList';
import Navbar from './Navbar';
import './Dashboard.css'; // <-- Ajoute ce fichier CSS

function Dashboard() {
  const [booksRead, setBooksRead] = useState([]);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [editProgress, setEditProgress] = useState(0);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newBookTitre, setNewBookTitre] = useState('');
  const [newBookAuteur, setNewBookAuteur] = useState('');
  const [newBookDescription, setNewBookDescription] = useState('');

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
        const user = res.data.user || {};
        setUsername(user.username || '');
        setBooksRead(user.booksRead || []);
        setUserId(user._id || '');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleDelete = async (bookReadId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/users/booksread/${bookReadId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBooksRead(prev => prev.filter(item => item._id !== bookReadId));
    } catch {
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = (bookReadId) => {
    const book = booksRead.find(item => item._id === bookReadId);
    if (book) {
      setEditBook(book);
      setEditProgress(book.progress || 0);
      setModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditBook(null);
    setEditProgress(0);
  };

  const handleModalSave = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:5000/users/booksread/${editBook._id}`,
        { progress: editProgress },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooksRead(prev =>
        prev.map(item =>
          item._id === editBook._id ? { ...item, progress: editProgress } : item
        )
      );
      handleModalClose();
    } catch {
      alert('Erreur lors de la modification');
    }
  };

  const handleAddFavorite = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `http://localhost:5000/users/${userId}/favorites`,
        { bookId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Livre ajouté aux favoris !');
    } catch {
      alert("Erreur lors de l'ajout aux favoris");
    }
  };

  const handleAddBook = async () => {
    try {
      await axios.post('http://localhost:5000/books', {
        titre: newBookTitre,
        auteur: newBookAuteur,
        description: newBookDescription,
      });
      setAddModalOpen(false);
      setNewBookTitre('');
      setNewBookAuteur('');
      setNewBookDescription('');
      alert('Livre ajouté à la bibliothèque !');
    } catch {
      alert("Erreur lors de l'ajout du livre");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      <Navbar />

      <h2 style={{ textAlign: 'center' }}>
        {username ? `Livres lus par ${username}` : 'Vos livres lus'}
      </h2>

      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <button className="btn-green" onClick={() => setAddModalOpen(true)}>
          Ajouter un livre à la bibliothèque
        </button>
      </div>

      {booksRead.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Aucun livre lu pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {booksRead.map((item, idx) => (
            <li key={item.book?._id || idx} className="book-card">
              <strong>{item.book?.titre || 'Titre inconnu'}</strong>
              <div>Auteur : {item.book?.auteur || 'Inconnu'}</div>
              <div>Progression : {item.progress || 0}%</div>
              <div className="button-group">
                <button className="btn-orange" onClick={() => handleEdit(item._id)}>
                  Modifier
                </button>
                <button className="btn-blue" onClick={() => handleAddFavorite(item.book?._id)}>
                  Favori
                </button>
                <button className="btn-red" onClick={() => handleDelete(item._id)}>
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {addModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Ajouter un livre à la bibliothèque</h3>
            <label>
              Titre
              <input type="text" value={newBookTitre} onChange={e => setNewBookTitre(e.target.value)} />
            </label>
            <label>
              Auteur
              <input type="text" value={newBookAuteur} onChange={e => setNewBookAuteur(e.target.value)} />
            </label>
            <label>
              Description
              <input type="text" value={newBookDescription} onChange={e => setNewBookDescription(e.target.value)} />
            </label>
            <div className="button-group">
              <button className="btn-green" onClick={handleAddBook}>Ajouter</button>
              <button className="btn-red" onClick={() => setAddModalOpen(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Modifier la progression</h3>
            <label>
              Progression (%)
              <input
                type="number"
                min={0}
                max={100}
                value={editProgress}
                onChange={e => setEditProgress(Number(e.target.value))}
              />
            </label>
            <div className="button-group">
              <button className="btn-blue" onClick={handleModalSave}>Enregistrer</button>
              <button className="btn-red" onClick={handleModalClose}>Annuler</button>
            </div>
          </div>
        </div>
      )}

      <BookList userId={userId} onBookRead={() => {}} />
    </div>
  );
}

export default Dashboard;
