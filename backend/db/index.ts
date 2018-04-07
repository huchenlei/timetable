import mongoose = require("mongoose");
mongoose.Promise = global.Promise;

export async function connect() {
    let connectionString = process.env.MONGO
        || "mongodb://localhost:27017/timetable";
    return mongoose.connect(connectionString);
}

// Export sub-modules
export * from "./course.db";

