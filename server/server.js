import 'dotenv/config'
import express from 'express'
import chalk from 'chalk';
import Db from './db.js';

const app = express();



const error = chalk.bold.red;
const success = chalk.bgGreenBright;

app.listen(process.env.PORT, () => {
    try {
        Db()
        console.log(success("Server Has Been Start"))
    } catch (e) {

        console.log(error("Please start your server again now"))

    }
})