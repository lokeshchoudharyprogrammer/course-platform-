import 'dotenv/config'
import express from 'express'
import chalk from 'chalk';
import Db from './db.js';

import assignmentsRouter from './routers/AssignmentRouter.js'
import mongoose from 'mongoose';
const app = express();

// Middleware
app.use(express.json());
const error = chalk.bold.red;
const success = chalk.bgGreenBright;

app.get("/", (req, res) => {
    res.send("<h1>Hello How Are You Man</h1>")
})


// Use the assignments route module
app.use('/assignments', assignmentsRouter);
app.listen(process.env.PORT,async () => {
    try {
        let connection = mongoose.connect(process.env.MONGODB_URL);
        await connection;
        console.log(success(`DB has been connected`));
        console.log(success("Server Has Been Start"))
    } catch (e) {

        console.log(error("Please start your server again now"))

    }
})