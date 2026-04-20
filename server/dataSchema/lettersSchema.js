const mongoose = require('mongoose')

// Schema that handle letters data
const letterSchema = mongoose.Schema(
    {
        // information to identify diffrant letters
        title: {type: String, required: true},
        message: {type: String, minLegnth: 50},
        writtenAt: {type: Date, default: Date.now},
        // public letters will show on the community 
        isPrivate: {type: Boolean, default: true},
        // user who send the letter
        sender: {type: String, default: "user"},
        // who will resive the letter input: email
        recipent: {type: String, required: true},
        // sender's relationship with the recipent
        realation: {
            type: String, default: "couple", 
            enum: ["Couple", "Parent-Chidrain", "Neibourgh", "Boss-Employee", "Colleague", "Friend"]
        },
        // All the Tools we Provide to make letters
        // text: the typography tab || text related data
        text: {
            fontStyle: {type: String, enum: [], default: "Lucida Grande"},
            textColor: {type: String, default: "#000000"},
            textSize: {type: Number, default: 16},
            textType: {
                type: String, default: "Heading", 
                enum: ["Heading", "Paragraph"]
            }
        },
        // cavas: the background tab || for beautiful appile HTML:Canvas
        cavas: {
            background: {type: String, default: "#ffffff"},
            // check if user has added any objects
            hasObject: {type: Boolean, default: false},
            // objects reffers to those element we add to canvas 
            objects: {
                type: String, default: "None", 
                enum: ["Circle", "Star", "Heart", "Blob"]
            },
            objectCount: {type: Number, default: 1,min: 1, max: 100},
            objectSize: {type: Number, default: 20},
            objectsMotion: {
                type: String, default: "Bounce", 
                enum: ["Bounce", "Wave", "Unbouce", "Fade-In-Out", "Pulse"]
            },
            isFullScreen: {type: Boolean, default: true}
        },
        // section: section tab is to handle HTML: sections in the letter page
        sections: {
            sectionCount: {type: Number, default: 1},
            sectionName: {type: String, default: "section1"},
            sectionIndex: {type: Number}
        },
        // media: to insert multi media in the letter
        media: {
            image: {type: String, default: null},
            Audio: {type: String, default: null},
            video: {type: String, default: null}
        },
        // components: to insert some interactive components in the letter
        components: {
            categpory: {
                type: String, default: null, 
                enum: ["Box", "Corousel", "Accordion", "Chat Bubbles"]
            }
        },
        animation: {
            // basic Animations from framer motion for basic animations on text and images
        },
        screenVeiw: {
            // just a panel for user check how their latters appair on diffrant screens
            // is it necesssery to add in schema ?
        },
    }
)

module.exports = letterSchema;