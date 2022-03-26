const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

// GET route for main page; withAuth calls next anonymous fxn
router.get("/", withAuth, (req, res) => {
  console.log(req.session);
  Post.findAll({
    // add where object to findAll() to only display posts created by the logged in user
    where: {
      // use the ID from the session
      id: req.session.user_id,
    },
    attributes: [
      "id",
      "content",
      "title",
      "created_at"
      ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
  .then((dbPostData) => {
    // pass a single post object into the homepage template
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });



  // render edit-post.handlebars template, passing in data from same Post.findOne() query used in /post/:id home route
  router.get('/edit/:id', withAuth, (req, res) => {
    Post.findByPk(req.params.id, {
      attributes: [
        "id",
        "content",
        "title",
        "created_at"
        ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    }).then(dbPostData => {
        if (dbPostData) {
          const post = dbPostData.get({ plain: true });
          
          res.render('edit-post', {
            post,
            loggedIn: true
          });
        } else {
          res.status(404).end();
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  });
}),
module.exports = router;
