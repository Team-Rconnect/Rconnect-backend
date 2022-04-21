const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,
    },
    connections: {
        type: Number,
        default: 0,
    },
    userName: {
        type: String,
        min: 6,
        required:true
    },
    email: String,
    password: {
        type: String,
        min: 6,
        required:true
    },
    userImage: String,
    dob: Date,
    title: String,
    about: String,
    skills: [String],
    experience: [
        {
            from: Date,
            to: Date,
            organization: String,
            description: String,
        },
    ],
    education: [
        {
            from: Date,
            to: Date,
            university: String,
            description: String,
        },
    ],
    projects: [
        {
            projectName:{
                type: String,
                required:true
            },
            isWorking:{
                type: String,
                required:true
            },
            startDate:{
                type: String,
                required:true
            },
            endDate:String,
            projectUrl:String,
            description:String
        }
    ],
});
module.exports = mongoose.model("Users", UserSchema);
