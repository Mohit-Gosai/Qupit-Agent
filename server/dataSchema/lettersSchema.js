const mongoose = require('mongoose');

// Schema that handles letters data
const letterSchema = new mongoose.Schema(
    {
        // Reference to the user who created the letter
        authorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: { type: String, required: true },
        slug: { type: String, unique: true, required: true }, 
        message: { type: String, minLength: 50 },
        writtenAt: { type: Date, default: Date.now },
        isPrivate: { type: Boolean, default: true },
        sender: { type: String, default: "user" },
        recipient: { type: String, required: true },
        
        relation: {
            type: String, 
            default: "Friend", 
            enum: ["Couple", "Parent-Children", "Neighbor", "Boss-Employee", "Colleague", "Friend"]
        },

        text: {
            fontStyle: { type: String, default: "Lucida Grande" },
            textColor: { type: String, default: "#000000" },
            textSize: { type: Number, default: 16 },
            textType: {
                type: String, 
                default: "Heading", 
                enum: ["Heading", "Paragraph"]
            }
        },

        canvas: {
            background: { type: String, default: "#ffffff" },
            hasObject: { type: Boolean, default: false },
            objects: {
                type: String, 
                default: "None", 
                enum: ["Circle", "Star", "Heart", "Blob", "None"]
            },
            objectCount: { type: Number, default: 1, min: 1, max: 100 },
            objectSize: { type: Number, default: 20 },
            objectsMotion: {
                type: String, 
                default: "Bounce", 
                enum: ["Bounce", "Wave", "Unbounce", "Fade-In-Out", "Pulse"]
            },
            isFullScreen: { type: Boolean, default: true }
        },

        media: {
            image: { type: String, default: null },
            audio: { type: String, default: null },
            video: { type: String, default: null }
        }
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Exporting as a Model for professional use
module.exports = letterSchema;