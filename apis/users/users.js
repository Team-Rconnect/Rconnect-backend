const express = require("express");
const User = require("../../models/User");
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
        const users = await Users.find();
        res.send(users);
    } catch (err) {
        res.json({ message: err });
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const user = await Users.findById(req.params.userId);
        res.send(user);
    } catch (err) {
        res.send({ message: err });
    }
});

router.post("/", upload.single("userImage"), async (req, res) => {
    console.log(req.file);
    const userObj=req.body;
    userObj["userImage"]=req.file.path;

    const userModal=new User(userObj)
    try {
        const savedUser = await userModal.save();
        res.json(savedUser);
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;
