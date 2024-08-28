// Handle login form submission
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;

            // Add login validation or authentication logic here
            if (email.includes('@')) {
                // Redirect to the registration page after successful login
                window.location.href = "Registration.html";
            } else {
                document.getElementById('emailError').style.display = 'block';
            }
        });
    }

    // Handle registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const firstName = document.getElementById('firstName').value;
            const surname = document.getElementById('surname').value;
            const idNumber = document.getElementById('idNumber').value;
            const mobileNumber = document.getElementById('mobileNumber').value;
            const password = document.getElementById('password').value;

            // Basic validation to check if all fields are filled
            if (firstName && surname && idNumber && mobileNumber && password.length >= 8) {
                // Send registration data to the server
                fetch('/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        firstName: firstName,
                        surname: surname,
                        idNumber: idNumber,
                        mobileNumber: mobileNumber,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Registration successful
                        alert(`Registration successful! Your trolley number is ${data.trolleyNumber}.`);
                        // Redirect to the portal page or another page
                        window.location.href = "Portal.html";
                    } else {
                        // Handle registration error
                        alert(data.message || 'Registration failed. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                });
            } else {
                alert("Please fill in all the required fields and ensure the password is at least 8 characters long.");
            }
        });
    }
});
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// API Endpoint for registration
app.post('/register', (req, res) => {
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
