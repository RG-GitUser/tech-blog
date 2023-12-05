const { Post } = require('../../models');
const router = require('express').Router();
const authenticate = require('../../utils/auth');

// Create new post - save record to db
router.post('/api/post', authenticate, async (req, res) => {
    try {
        const { title, content } = req.body;
        const author_id = req.session.user_id; // Assuming you have user authentication

        const postData = await Post.create({
            title,
            content,
            user_id: author_id,
        });

        res.status(201).json(postData);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
