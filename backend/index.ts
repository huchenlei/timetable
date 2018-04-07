import app from './app';
import {connect} from "./db";

const port = process.env.PORT || 3000;

// First connect to database on initialization
connect().then(mongoose => {
    return app.listen(port);
}).then(() => {
    return console.log(`listening on port ${port}!`);
}).catch((err) => {
    return console.log(err);
});
