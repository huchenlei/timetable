import * as express from 'express';
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as morgan from "morgan";


class App {
    public express;

    constructor() {
        this.express = express();
        this.configLibraries();
        this.mountRoutes();
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
        this.express.use(express.static(path.join(__dirname, '/dist')));
    }

    private mountRoutes() {
        const router = express.Router();
        router.get('/', (req, res) => {
            res.json({
                message: "Hello!"
            })
        });
        this.express.use('/', router);
    }
}

export default new App().express;