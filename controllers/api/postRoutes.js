const { Post } = require('../../models');
const router = require('express').Router();
const authenticate = require('../../utils/auth');

// Create new post - save record to db
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, content } = req.body;
    const author_id = req.session.user_id; // Assuming you have user authentication

    const blogpostData = await Post.create({
      name,
      content,
      user_id: author_id,
    });

    // Redirect to the homepage after successfully creating a post
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Retrieve blog post data as JSON
router.get('/api/posts', async (req, res) => {
  try {
    const postData = await Post.findAll();
    res.json(postData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;