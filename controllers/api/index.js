const router = require('express').Router();

const homeRoutes = require('../api/homeRoutes');

router.use('/api', homeRoutes);


module.exports = router;