// Route for rendering handlebars view (homepage)
app.get('/', async (req, res, next) => {
    try {
        res.render('main', { pageTitle: 'Homepage' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Route for rendering handlebars view (dashboard)
app.get('/dashboard', async (req, res, next) => {
    try {
        res.render('dashboard', { pageTitle: 'Dashboard' });
    } catch (error) {
        console.error(error);
        next(error);
    }
});


