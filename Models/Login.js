const mongoose = require('mongoose');

// Define the Login schema
const loginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create the Login model
const Login = mongoose.model('logins', loginSchema);

module.exports = Login;
