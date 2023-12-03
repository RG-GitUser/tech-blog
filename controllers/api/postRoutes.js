const { Post } = require('../../models');
const router = require('express').Router()
const authenticate = require('../../utils/auth');


// create new post - save record to db
router.post('/dashboard', authenticate, async (req, res) => {
    try {
      const postData = await Post.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = postData.id;
        req.session.logged_in = true;
  
        res.status(200).json(postData);
      });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //deleting post 
  router.delete('/:id', authenticate, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
      if (!postData) {
        res.status(404).json({ message: 'No posts found with this id!' });
        return;    //if successful, display message. 
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

module.exports = router;


  
  