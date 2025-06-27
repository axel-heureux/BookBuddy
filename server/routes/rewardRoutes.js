const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const auth = require('../middleware/authMiddleware');

// Routes publiques
router.get('/', rewardController.getRewards);
router.get('/:id', rewardController.getRewardById);

// Routes sensibles protégées
router.post('/', auth, rewardController.createReward);
router.put('/:id', auth, rewardController.updateReward);
router.delete('/:id', auth, rewardController.deleteReward);

module.exports = router;
