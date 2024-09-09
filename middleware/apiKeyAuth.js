const ApiKey = require('../models/ApiKey');

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.header('X-API-Key');
  if (!apiKey) return res.status(401).json({ error: 'API key is required' });

  const validKey = await ApiKey.findOne({ key: apiKey, isActive: true });
  if (!validKey) return res.status(401).json({ error: 'Invalid API key' });

  next();
};

module.exports = apiKeyAuth;