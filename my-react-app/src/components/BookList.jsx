import { useEffect, useState } from 'react';
import axios from 'axios';

function BookList({ userId, onBookRead }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editBook, setEditBook] = useState(null);
  const [editTitre, setEditTitre] = useState('');
  const [editAuteur, setEditAuteur] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get('http://localhost:5000/books')
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Supprimer ce livre ?')) return;
    try {
      await axios.delete(`http://localhost:5000/books/${bookId}`);
      setBooks(books.filter(book => book._id !== bookId));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const openEditModal = (book) => {
    setEditBook(book);
    setEditTitre(book.titre);
    setEditAuteur(book.auteur);
    setEditDescription(book.description || '');
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      await axios.put(`http://localhost:5000/books/${editBook._id}`, {
        titre: editTitre,
        auteur: editAuteur,
        description: editDescription,
      });
      setEditModalOpen(false);
      setEditBook(null);
      fetchBooks();
    } catch (err) {
      alert("Erreur lors de la modification");
    }
  };

  // Ajoute ce handler pour basculer un livre dans "livres lus"
  const handleMarkAsRead = async (bookId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post(
        `http://localhost:5000/users/${userId}/booksread`,
        { bookId, progress: 0 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Livre ajouté aux livres lus !');
      if (onBookRead) onBookRead();
    } catch (err) {
      alert("Erreur lors de l'ajout aux livres lus");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>Tous les livres de la bibliothèque</h2>
      {books.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Aucun livre ajouté pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((book, idx) => (
            <li key={book._id || idx} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
              <strong>{book.titre}</strong>
              <div>Auteur : {book.auteur}</div>
              <div>Description : {book.description || 'Aucune description'}</div>
              <button
                style={{ marginRight: 8, background: '#10b981', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer' }}
                onClick={() => handleMarkAsRead(book._id)}
              >
                Marquer comme lu
              </button>
              <button
                style={{ marginRight: 8, background: '#f59e42', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer' }}
                onClick={() => openEditModal(book)}
              >
                Modifier
              </button>
              <button
                style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer' }}
                onClick={() => handleDelete(book._id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Modal d'édition */}
      {editModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', padding: '2rem', borderRadius: 8, minWidth: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ color: '#111' }}>Modifier le livre</h3>
            <div style={{ marginBottom: '1rem', color: '#111' }}>
              <label>
                Titre&nbsp;
                <input
                  type="text"
                  value={editTitre}
                  onChange={e => setEditTitre(e.target.value)}
                  required
                  style={{ width: 180 }}
                  placeholder="Titre du livre"
                />
              </label>
            </div>
            <div style={{ marginBottom: '1rem', color: '#111' }}>
              <label>
                Auteur&nbsp;
                <input
                  type="text"
                  value={editAuteur}
                  onChange={e => setEditAuteur(e.target.value)}
                  required
                  style={{ width: 180 }}
                  placeholder="Auteur"
                />
              </label>
            </div>
            <div style={{ marginBottom: '1rem', color: '#111' }}>
              <label>
                Description&nbsp;
                <input
                  type="text"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  style={{ width: 180 }}
                  placeholder="Description"
                />
              </label>
            </div>
            <button
              style={{ marginRight: 8, background: '#10b981', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 1rem', cursor: 'pointer' }}
              onClick={handleEditSave}
            >
              Enregistrer
            </button>
            <button
              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 1rem', cursor: 'pointer' }}
              onClick={() => setEditModalOpen(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;