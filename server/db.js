
// require('dotenv').config()
import 'dotenv/config'
import chalk from 'chalk';
import { MongoClient } from 'mongodb';

const error = chalk.bold.red;
const success = chalk.bgGreenBright;
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Db =async  () => {
    
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log(success("Pinged your deployment. You successfully connected to MongoDB!"));
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();


      }

}
export default  Db
// module.exports = { Db }
