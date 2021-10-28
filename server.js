const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');

const PORT = process.env.PORT || 8000

const app = express();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server is Running.')
})

// Connect to Mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('Database Connected Successfully');
        
        // Database
        const database = client.db("assignment_11")

        // Collections
        const usersCollection = database.collection("users");

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


