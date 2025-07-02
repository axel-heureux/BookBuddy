const User = require('../models/user');
const jwt = require('jsonwebtoken');

// GET all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate('booksRead').populate('rewards');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('booksRead').populate('rewards');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new user
exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update user
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReadingProgress = async (req, res) => {
  try {
    const { userId, bookId } = req.params;
    const { progress } = req.body; // progress = nombre de pages lues ou pourcentage

    if (progress == null) {
      return res.status(400).json({ message: 'Progress is required' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Cherche si le livre existe déjà dans booksRead
    let bookProgress = user.booksRead.find(
      (item) => item.book && item.book.toString() === bookId
    );

    if (bookProgress) {
      bookProgress.progress = progress;
    } else {
      user.booksRead.push({ book: bookId, progress });
    }

    await user.save();
    res.json(user.booksRead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Recherche l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Vérifie le mot de passe (en clair ici, à sécuriser avec bcrypt en prod)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Authentification réussie : génération du token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      userId: user._id,
      username: user.username
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res.json({ message: "Déconnexion réussie (statique, à adapter si tu utilises des tokens/sessions)" });
};

exports.getProfile = async (req, res) => {
  try {
    // req.user._id doit être présent (voir remarque ci-dessous)
    const user = await User.findById(req.user._id || req.user.id)
      .populate('booksRead.book')
      .populate('favorites.book')
      .populate('rewards');
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
};

// GET books read by the user
exports.getBooksRead = (req, res) => {
  // On suppose que req.user.booksRead contient les livres lus (peuplé par le middleware auth)
  res.json({ booksRead: req.user.booksRead || [] });
};

// Ajoute une reward à un utilisateur
exports.addRewardToUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { rewardId } = req.body; // l'id du badge à ajouter

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

    // Ajoute le badge si pas déjà présent
    if (!user.rewards.includes(rewardId)) {
      user.rewards.push(rewardId);
      await user.save();
    }

    res.json({ message: 'Badge attribué', rewards: user.rewards });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};