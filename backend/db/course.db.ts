import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const courseSchema = mongoose.model('course', new Schema({
    "id": {
        type: String,
        required: true,
        unique: true
    },
    "code": String,
    "name": String,
    "description": String,
    "division": String,
    "department": String,
    "prerequisites": String,
    "exclusions": String,
    "level": Number,
    "campus": String,
    "term": String,
    "breadths": [Number],
    "meeting_sections": [{
        "code": String,
        "instructors": [String],
        "times": [{
            "day": String,
            "start": Number,
            "end": Number,
            "duration": Number,
            "location": String,
            "extended_location": {
                "building": String,
                "room": String,
                "lat": Number,
                "lng": Number
            }
        }],
        "size": Number,
        "enrolment": Number
    }]
}));

