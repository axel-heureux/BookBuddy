import { useEffect, useState } from 'react';
import axios from 'axios';
import './dashboard.css';

function Dashboard() {
  const [booksRead, setBooksRead] = useState([]);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [editProgress, setEditProgress] = useState(0);

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
        setUsername(res.data.user?.username || '');
        setBooksRead(res.data.user?.booksRead || []);
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
      setBooksRead(booksRead.filter(item => item._id !== bookReadId));
    } catch (err) {
      alert('Erreur lors de la suppression');
    }
  };

  const handleEdit = (bookReadId) => {
    const book = booksRead.find(item => item._id === bookReadId);
    setEditBook(book);
    setEditProgress(book.progress || 0);
    setModalOpen(true);
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
      setBooksRead(booksRead.map(item =>
        item._id === editBook._id ? { ...item, progress: editProgress } : item
      ));
      handleModalClose();
    } catch (err) {
      alert('Erreur lors de la modification');
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2 style={{ textAlign: 'center' }}>
        {username ? `Livres lus par ${username}` : 'Vos livres lus'}
      </h2>
      {booksRead.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Aucun livre lu pour le moment.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {booksRead.map((item, idx) => (
            <li key={item.book?._id || idx} style={{ margin: '1rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: 8 }}>
              <strong>{item.book?.titre || 'Titre inconnu'}</strong>
              <div>Auteur : {item.book?.auteur || 'Inconnu'}</div>
              <div>Progression : {item.progress || 0}%</div>
              <button
                style={{ marginRight: 8, background: '#f59e42', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer' }}
                onClick={() => handleEdit(item._id)}
              >
                Modifier
              </button>
              <button
                style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 0.8rem', cursor: 'pointer' }}
                onClick={() => handleDelete(item._id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}

      {modalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', padding: '2rem', borderRadius: 8, minWidth: 300, boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            <h3 style={{ color: '#111' }}>Modifier la progression</h3>
            <div style={{ marginBottom: '1rem', color: '#111' }}>
              <label>
                Progression (%):&nbsp;
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={editProgress}
                  onChange={e => setEditProgress(Number(e.target.value))}
                  style={{ width: 60 }}
                />
              </label>
            </div>
            <button
              style={{ marginRight: 8, background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 1rem', cursor: 'pointer' }}
              onClick={handleModalSave}
            >
              Enregistrer
            </button>
            <button
              style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.3rem 1rem', cursor: 'pointer' }}
              onClick={handleModalClose}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;