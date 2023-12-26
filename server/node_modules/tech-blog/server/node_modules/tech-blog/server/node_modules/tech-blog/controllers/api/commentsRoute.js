const { Comment, User, Post } = require('../../models');
const router = require('express').Router();
const authenticate = require('../../utils/auth');

router.use(authenticate);

// Create new comment - save record to db
router.post('/:post_id', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    const post_id = req.params.post_id;
    const user_id = req.session.user_id;

    const commentData = await Comment.create({
      text,
      post_id,
      user_id,
    });

    // Success message
    res.status(201).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Retrieve comments for a specific post
router.get('/:post_id', async (req, res) => {
  try {
    const post_id = req.params.post_id;

    const commentData = await Comment.findAll({
      where: { post_id },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Update a comment
router.put('/:id', authenticate, async (req, res) => {
  try {
    const comment_id = req.params.id;
    const { text } = req.body;
    const user_id = req.session.user_id;

    const comment = await Comment.findByPk(comment_id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user owns the comment
    if (comment.user_id !== user_id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Update the comment text
    comment.text = text;
    await comment.save();

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Delete a comment
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const comment_id = req.params.id;
    const user_id = req.session.user_id;

    const comment = await Comment.findByPk(comment_id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check if the user owns the comment
    if (comment.user_id !== user_id) {
      return res.status(403).json({ message: 'Permission denied' });
    }

    // Delete the comment
    await comment.destroy();

    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
