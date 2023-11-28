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




module.exports = router;