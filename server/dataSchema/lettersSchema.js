const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema(
    {
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true },
        slug: { type: String, unique: true, required: true },
        writtenAt: { type: Date, default: Date.now },
        isPrivate: { type: Boolean, default: true },
        recipient: { type: String, required: true },
        relation: {
            type: String,
            default: "Friend",
            enum: ["Couple", "Parent-Children", "Neighbor", "Boss-Employee", "Colleague", "Friend"]
        },

        // REFACTORED: The "Story" Array
        // This allows you to have Section 1 (Hero) -> Section 2 (Shayari) -> Section 3 (Media Grid)
        sections: [{
            sectionName: { type: String },
            sectionType: { 
                type: String, 
                enum: ["single-column", "two-columns", "custom-grid", "hero-reveal"],
                default: "single-column" 
            },
            background: { type: String, default: "transparent" },
            
            // Content nested inside each section
            content: {
                message: { type: String },
                fontStyle: { type: String, default: "Lucida Grande" },
                textColor: { type: String, default: "#000000" },
                textSize: { type: Number, default: 16 },
                media: {
                    image: { type: String },
                    video: { type: String },
                    audio: { type: String }
                }
            },

            // Visual effects for this specific section
            canvasConfig: {
                objects: { type: String, enum: ["Circle", "Star", "Heart", "Blob", "None"], default: "None" },
                motion: { type: String, enum: ["Bounce", "Wave", "Fade-In-Out", "Pulse"], default: "Fade-In-Out" },
                objectCount: { type: Number, default: 10 }
            }
        }],

        // Global Canvas Settings (Floating objects that follow the whole scroll)
        globalCanvas: {
            hasGlobalObjects: { type: Boolean, default: false },
            globalBackground: { type: String, default: "#ffffff" }
        }
    },
    { timestamps: true }
);

module.exports = letterSchema;