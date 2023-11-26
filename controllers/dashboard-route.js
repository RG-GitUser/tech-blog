const router = require("express").Router();

// Define a route for the dashboard
app.get('/dashboard', (req, res) => {
    res.sendFile(__dirname + './views/dashboard.hbs');
});

module.exports = router;