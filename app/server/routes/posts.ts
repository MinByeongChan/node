import express from "express";
const router = express.Router();
const Post = require("../model/Post");

//GET BACK ALL THE POSTS
router.get("/", async (req: express.Request, res: express.Response) => {
  try {
    const posts = await Post.find((err:any, data:any) => {
      console.log(data);
    });
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//SUBMITS A POST
router.post("/", async (req: express.Request, res: express.Response) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const postSaved = await post.save();
    res.json(postSaved);
  } catch (err) {
    res.json({ message: err });
  }
});

//SPECIFIC POST
router.get("/:postId", async (req: express.Request, res: express.Response) => {
  try {
    const post = await Post.findById(req.params.postId);
    console.log(post);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete post
router.delete("/:postId", async (req: express.Request, res: express.Response) => {
  try {
    const removePost = await Post.remove({ _id: req.params.postId });
    res.json(removePost);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update a post
router.patch("/:postId", async (req: express.Request, res: express.Response) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
