const packageSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  package: { type: Number, validate: { validator: Number.isInteger, message: 'Package must be an integer' } },
  // add other fields as needed
});

module.exports = mongoose.model('Package', packageSchema);