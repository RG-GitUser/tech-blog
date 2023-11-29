const router = require('express').Router();

const homeRoutes = require('./api');

router.use('/api', homeRoutes);


module.exports = router;