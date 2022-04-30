const express = require("express");
const User = require("../../models/User");
const router = express.Router();
const multer = require("multer");
const {use} = require("express/lib/router");

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
    limits: {fileSize: 1024 * 1024 * 5},
    fileFilter: fileFilter,
});

router.get("/", async (req, res) => {
    console.log("helloooo")
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.json({message: err});
    }
});

router.get("/:userId", async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.send(user);
    } catch (err) {
        res.send({message: err});
    }
});

router.post("/", upload.single("userImage"), async (req, res) => {
    console.log(req.file);
    const userObj = req.body;
    if (req.file)
        userObj["userImage"] = req.file.path;

    const userModal = new User(userObj)
    try {
        const savedUser = await userModal.save();
        res.json(savedUser);
    } catch (err) {
        res.json({message: err});
    }
});

router.post("/:userId/projects", async (req, res) => {
    var userId = req.params.userId;
    User.findByIdAndUpdate(
        userId,
        {$push: {"projects": req.body}},
        {safe: true, upsert: true},
        function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully added project"
            });
        });
})
//change about,fname,lname etc...
router.post("/:userId/change", async (req, res) => {
    var userId = req.params.userId;
    console.log("how are you")
    User.findOneAndUpdate({_id: userId},
        {$set: req.body}, {safe: true, upsert: true},
        function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully changed"
            });
        })
})

//update a experience
router.post("/update/:userId/experience/:experienceId", async (req, res) => {
    console.log("in update experience method")
    var userId = req.params.userId
    var experienceId = req.params.experienceId
    User.findOneAndUpdate   ( {'_id':userId,'experience._id': experienceId},
        {$set:  {
                "experience.$.title": "wxyz"
            }},
        {'new': true, 'safe': true, 'upsert': true},
        function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully updated experience"
            })
        })
})
router.post("/:userId/experience", async (req, res) => {
    var userId = req.params.userId;
    User.findByIdAndUpdate(
        userId,
        {$push: {"experience": req.body}},
        {safe: true, upsert: true},
        function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully added experience"
            });
        });
})

router.post("/:userId/education", async (req, res) => {
    var userId = req.params.userId;
    User.findByIdAndUpdate(
        userId,
        {$push: {"education": req.body}},
        {safe: true, upsert: true},
        function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully added education"
            });
        });
})

router.delete("/:userId/projects/:projectId", async (req, res) => {

    var userId = req.params.userId
    var projectId = req.params.projectId
    User.findByIdAndUpdate(
        userId,
        {$pull: {'projects': {_id: projectId}}}, function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully deleted project"
            });
        });
})
router.delete("/:userId/education/:educationId", async (req, res) => {

    var userId = req.params.userId
    var educationId = req.params.educationId
    User.findByIdAndUpdate(
        userId,
        {$pull: {'education': {_id: educationId}}}, function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully deleted education"
            });
        });
})


router.delete("/:userId/experience/:experienceId", async (req, res) => {
    var userId = req.params.userId
    var experienceId = req.params.experienceId
    User.findByIdAndUpdate(
        userId,
        {$pull: {'experience': {_id: experienceId}}}, function (err, model) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            return res.json({
                status: true,
                message: "successfully deleted experience"
            });
        });
})
module.exports = router;
