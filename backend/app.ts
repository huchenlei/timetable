import * as express from 'express';
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as morgan from "morgan";

import {router as course} from "./route/course.route";

class App {
    public express;

    constructor() {
        this.express = express();
        this.configLibraries();
        this.mountRoutes();
        this.mountErrorHandlers();
    }

    private configLibraries() {
        this.express.use(morgan("default")); // Logger
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(session(
            {
                secret: 'I am invisible',
                resave: false,
                saveUninitialized: false
            }));
        this.express.use(function (req, res, next) {
            res.locals.session = req.session;
            next();
        });
        this.express.use(cookieParser());
        this.express.use(express.static(path.join(__dirname, '../')));
    }

    private mountRoutes() {
        this.express.use('/course', course);
        this.express.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../index.html'));
            // res.render("index.html");
        });
    }

    private mountErrorHandlers() {
        // Error logger
        this.express.use((err, req, res, next) => {
            console.error(err.stack);
            next(err);
        });
        // Client error handler
        this.express.use((err, req, res, next) => {
            if (req.xhr) {
                res.status(500).send({error: `Server Error ${err.message}`});
            } else {
                next(err);
            }
        });
        // General error handler
        this.express.use((err, req, res, next) => {
            res.status(500);
            res.render('error', {error: err});
        });
    }
}

export default new App().express;