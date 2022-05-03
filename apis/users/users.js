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
        cb(null, file.originalname);
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

//update  experience
router.post("/update/:userId/experience/:experienceId", async (req, res) => {
    var userId = req.params.userId
    var experienceId = req.params.experienceId
    var body = req.body
    var passedObject = {}
    for (const [key, value] of Object.entries(body)) {
        passedObject[`experience.$.${key}`] = value
    }
    User.findOneAndUpdate({'_id': userId, 'experience._id': experienceId},
        {$set: passedObject},
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

//update project
router.post("/update/:userId/project/:projectId", async (req, res) => {
    var userId = req.params.userId
    var projectId = req.params.projectId
    var body = req.body
    var passedObject = {}
    for (const [key, value] of Object.entries(body)) {
        passedObject[`project.$.${key}`] = value
    }
    User.findOneAndUpdate({'_id': userId, 'project._id': projectId},
        {$set: passedObject},
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

//update education
router.post("/update/:userId/education/:educationId", async (req, res) => {
    var userId = req.params.userId
    var educationId = req.params.educationId
    var body = req.body
    var passedObject = {}
    for (const [key, value] of Object.entries(body)) {
        passedObject[`education.$.${key}`] = value
    }
    User.findOneAndUpdate({'_id': userId, 'education._id': educationId},
        {$set: passedObject},
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

router.post("/:userId/skills", async (req, res) => {
    var userId = req.params.userId

    User.findByIdAndUpdate(userId,
        {$set: req.body},
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
        }
    )
})
module.exports = router;
