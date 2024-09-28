const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, 'dist/highlevel-appointment-project-frontend/browser')));

// Serve the index.html for all routes, to support Angular routing
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/highlevel-appointment-project-frontend/browser/index.html'));
});

// Start the app by listening on the default Heroku port or your own port
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

