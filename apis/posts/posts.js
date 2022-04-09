const express = require("express");
const Post = require("../../models/Post");
const router = express.Router();

const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: fileFilter,
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.send(post);
  } catch (err) {
    res.send({ message: err });
  }
});

router.post("/", upload.single("postImage"), async (req, res) => {
  console.log(req.file);
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
    postImage: req.file.path,
  });
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:postId", async (req, res) => {
  console.log("in delete");
  const removedPost = await Post.remove({ _id: req.params.postId });
  res.send(removedPost);
});

router.patch("/:postId", async (req, res) => {
  const updatedPost = await Post.updateOne(
    { _id: req.params.postId },
    { $set: { title: req.body.title } }
  );
  res.send(updatedPost);
});
module.exports = router;
