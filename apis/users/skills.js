// const express = require("express");
// const Skill = require("../../models/Skill");
// const router = express.Router();
//
// router.get("/", async (req, res) => {
//     try {
//         const skills = await Skill.find();
//         res.send(skills);
//     } catch (err) {
//         res.json({ message: err });
//     }
// });
//
// router.get("/:skillId", async (req, res) => {
//     try {
//         const skill = await Skill.findById(req.params.skillId);
//         res.send(skill);
//     } catch (err) {
//         res.send({ message: err });
//     }
// });
//
// router.post("/",async (req, res) => {
//     const skillObj = req.body;
//
//     const skillModal = new Skill(skillObj)
//     try {
//         const savedSkill = await skillModal.save();
//         res.json(savedSkill);
//     } catch (err) {
//         res.json({message: err});
//     }
// });
// module.exports=router