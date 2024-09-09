const mongoose = require('mongoose');

const apiKeySchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  expiryDate: { type: Date, default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }
});

// TTL index
apiKeySchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

// Pre-find hook to check and update isActive
apiKeySchema.pre('find', function() {
  this.where({ expiryDate: { $gt: new Date() } });
});

apiKeySchema.pre('findOne', function() {
  this.where({ expiryDate: { $gt: new Date() } });
});

const ApiKey = mongoose.model('ApiKey', apiKeySchema);

module.exports = ApiKey;