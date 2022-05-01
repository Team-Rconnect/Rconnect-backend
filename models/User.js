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
        required: true
    },
    email: String,
    password: {
        type: String,
        min: 6,
        required: true
    },
    userImage: String,
    dob: Date,
    title: String,
    about: String,
    skills: [String],
    experience: [
        {
            title: String,
            employementType: String,
            companyName: String,
            location: String,
            isWorking: Boolean,
            startDate: {
                type: String,
                required: true
            },
            endDate: String,
            description: String
        },
    ],
    education: [
        {
            college: String,
            degree: String,
            fieldOfStudy: String,
            startDate: {
                type: String,
                required: true
            },
            endDate: String,
            grade: Number,
            description: String
        },
    ],
    projects: [
        {
            projectName: {
                type: String,
                required: true
            },
            isWorking: {
                type: String,
                required: true
            },
            startDate: {
                type: String,
                required: true
            },
            endDate: String,
            projectUrl: String,
            description: String
        }
    ],
    branch: {
        type: String,
    },
    year: {
        type: String,
    },
    gender: {
        type: String
    }
});
module.exports = mongoose.model("Users", UserSchema);
