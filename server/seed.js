require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const Book = require('./models/Book');
const Reward = require('./models/Reward');

// 🔗 Connexion MongoDB avec .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connecté à MongoDB'))
.catch(err => console.error('❌ Erreur MongoDB:', err));

// ⚙️ Fonction de seed
async function seedDB() {
  try {
    await User.deleteMany();
    await Book.deleteMany();
    await Reward.deleteMany();

    const books = await Book.insertMany([
      {
        titre: 'Le Petit Prince',
        auteur: 'Antoine de Saint-Exupéry',
        categorie: 'Roman',
        pages: 96,
        couverture: '',
        resume: 'Un aviateur rencontre un petit prince venu d’une autre planète.',
        description: 'Un classique français',
        disponible: true
      },
      {
        titre: 'Harry Potter',
        auteur: 'J.K. Rowling',
        categorie: 'Fantastique',
        pages: 350,
        couverture: '',
        resume: 'Un jeune sorcier à l’école de magie.',
        description: 'Un jeune sorcier à l’école de magie',
        disponible: true
      },
      {
        titre: '1984',
        auteur: 'George Orwell',
        categorie: 'Dystopie',
        pages: 328,
        couverture: '',
        resume: 'Une dystopie sur la surveillance.',
        description: 'Une dystopie sur la surveillance',
        disponible: true
      },
    ]);

    const rewards = await Reward.insertMany([
      { nom: 'Badge Premier Livre', description: 'Pour avoir lu un livre', cout: 10 },
      { nom: 'Badge Avid Reader', description: 'Pour avoir lu 3 livres', cout: 30 },
    ]);

    const user = new User({
      username: 'Alice Dupont',
      email: 'alice@example.com',
      password: 'password123',
      livresLus: [books[0]._id, books[1]._id],
      recompenses: [rewards[0]._id],
    });

    await user.save();

    console.log('✅ Données insérées avec succès');
  } catch (err) {
    console.error('❌ Erreur insertion:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();
