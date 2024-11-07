const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const EmployeeRoutes = require('./Routes/EmployeeRoutes');
const Login = require('./Models/Login');
const  LoginRoutes= require('./Routes/LoginRoutes');
const session = require('express-session');
const PORT = process.env.PORT || 8080;

require('./Models/db');
app.use(cors());

app.use(bodyParser.json());

// Add the login route to the application

app.use(session({
    secret: 'your-secret-key',  // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true for HTTPS
}));

const createAdmin = async () => {
  const admin = new Login({
    username: process.env.username, // Hardcoded admin username
    password: process.env.password, // Hardcoded admin password (consider hashing in production)
  });

  try {
    const savedAdmin = await admin.save(); // Save the admin user
    console.log('Admin created successfully:', savedAdmin);
  } catch (error) {
    console.error('Error creating admin:', error);
  }
};

// Call the createAdmin function to insert the admin user
createAdmin();


app.use('/login', LoginRoutes); 
app.use('/api/employee', EmployeeRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
})