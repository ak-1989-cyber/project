const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API Endpoint for registration
app.post('/Registration', (req, res) => {
    const { firstName, surname, idNumber, mobileNumber, password } = req.body;

    // Basic validation (in a real application, add more validation)
    if (!firstName || !surname || !idNumber || !mobileNumber || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Simulate storing data (in a real application, you'd save this to a database)
    const trolleyNumber = Math.floor(Math.random() * 1000) + 1; // Example trolley number

    // Send a success response
    res.json({
        success: true,
        firstName: firstName,
        surname: surname,
        idNumber: idNumber,
        mobileNumber: mobileNumber,
        trolleyNumber: trolleyNumber
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
