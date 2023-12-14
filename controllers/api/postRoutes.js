const { Post, User } = require('../../models');
const router = require('express').Router();
const authenticate = require('../../utils/auth');

router.use(authenticate);

// Create new post - save record to db
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, description } = req.body;
    const author_id = req.session.user_id; 

    const blogpostData = await Post.create({
      name,
      description,
      user_id: author_id,
    });

    // Send a JSON response indicating success
    res.status(201).json(blogpostData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Retrieve only the first three blog posts as JSON
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      limit: 3, // Limit the number of retrieved posts to 3
      order: [['name', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
