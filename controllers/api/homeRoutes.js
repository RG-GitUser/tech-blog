const path = require('path');
const fs = require('fs');
const router = require('express').Router();

// Route for rendering handlebars view (homepage)
router.get('/', async (req, res, next) => {
    try {
        res.render('home', { pageTitle: 'Homepage' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Route for rendering handlebars view (dashboard)
router.get('/dashboard', async (req, res, next) => {
    try {
        res.render('dashboard', { pageTitle: 'Dashboard' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


// Route for rednering blogpostData 

// Define the route to serve the JSON data
router.get('/blogposts', (req, res) => {
    const blogDataPath = path.join(__dirname, './seeds/blogpostData.json');
    const blogData = JSON.parse(fs.readFileSync(blogDataPath, 'utf-8'));
    res.json(blogData);
  });
  



module.exports = router;