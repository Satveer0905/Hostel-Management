const express = require('express'); // Import Express module
const fs = require('fs').promises; // Import fs module for file operations
const app = express(); // Create an Express application
const PORT = 3005; // Define the port number for the server

app.use(express.json()); // Middleware to parse incoming JSON requests

// Set CORS headers for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Handle preflight requests (OPTIONS)
app.options('*', (req, res) => {
    res.status(200).end();
});

// Registration route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;
        let data = []; // Initialize an empty array for user data

        // Attempt to read existing user data from student.json
        try {
            const fileData = await fs.readFile('student.json', 'utf-8');
            data = JSON.parse(fileData); // Parse the JSON data into an array
        } catch {
            data = []; // If file doesn't exist, initialize data as an empty array
        }

        // Check if the email is already registered
        const exists = data.find(u => u.email === email);
        if (exists) {
            return res.status(400).json({ msg: "Email is already registered" });
        }

        // Add the new user to the array
        data.push({ name, email, password, userType });

        // Write the updated user data to student.json
        await fs.writeFile('student.json', JSON.stringify(data, null, 2));

        // Send success response
        res.status(200).json({ msg: "User successfully registered" });
    } catch (err) {
        res.status(500).json({ msg: "Error: " + err.message }); // Handle errors
    }
});

// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Read user data from student.json
        const fileData = await fs.readFile('student.json', 'utf-8');
        const users = JSON.parse(fileData);

        // Check if the user exists and if the password and role match
        const user = users.find(u => u.email === email && u.password === password && u.userType === role);

        if (user) {
            return res.status(200).json({ msg: "success" }); // User found, send success response
        } else {
            return res.status(400).json({ msg: "User is invalid" }); // User not found
        }
    } catch (err) {
        res.status(500).json({ msg: "Error: " + err.message }); // Handle errors
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
