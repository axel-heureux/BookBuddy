const Reward = require('../models/Reward.js');

exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getRewardById = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward) return res.status(404).json({ message: 'Reward not found' });
    res.json(reward);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createReward = async (req, res) => {
  const reward = new Reward(req.body);
  try {
    const saved = await reward.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateReward = async (req, res) => {
  try {
    const updated = await Reward.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Reward not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteReward = async (req, res) => {
  try {
    const deleted = await Reward.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Reward not found' });
    res.json({ message: 'Reward deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
