const express = require('express');
const router = express.Router();
const Login = require('../Models/Login'); // Import the Login model

// POST login route to handle admin login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database (you can add more logic here)
        console.log('Received username:', username);
        const user = await Login.findOne({ username: username });
        console.log('Found user:', user);


        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }

        // Directly compare password (You could use hashing if needed)
        if (user.password === password) {
            // If credentials are correct, store user session or send a success response
            req.session.user = user;  // Saving user details in session (optional)
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(400).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
