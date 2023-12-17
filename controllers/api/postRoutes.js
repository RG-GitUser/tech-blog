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

    //Success message
    res.status(201).json(blogpostData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Retrieve blog posts as JSON
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [['name', 'ASC']],
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comments, 
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


router.post('/:id/comment', async (req, res) => {
  try {
    const postId = req.params.id;
    const { comment } = req.body;
    const userId = req.session.user_id;

    // Find the post
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Append the new comment
    const newComment = {
      text: comment,
      user_id: userId,
      date_created: new Date(),
    };

    post.comments.push(newComment);

    // Save the updated post
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Delete a post 




module.exports = router;
