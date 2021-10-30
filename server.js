const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

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
        const packagesCollection = database.collection("packages");
        const ordersCollection = database.collection("orders");


        // Create new User
        app.post('/api/auth/register', async (req, res) => {
            const { email, userName } = req.body;
            try {
                const oldUser = await usersCollection.findOne({ email: email })

                if (!oldUser) {
                    const userInfo = {
                        email: email,
                        userName: userName
                    }

                    const createdUser = await usersCollection.insertOne(userInfo)
                    const newUser = await usersCollection.findOne({ _id: createdUser.insertedId })
                    res.status(201).json(newUser);
                } else {
                    res.status(200).json(oldUser);
                }

            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });


        // Add New Package
        app.post('/api/packages/add', async (req, res) => {
            const { title, description, thumbnail, price, location, duration } = req.body;
            try {
                const createdPackage = await packagesCollection.insertOne({
                    title: title,
                    description: description,
                    thumbnail: thumbnail,
                    price: price,
                    location: location,
                    duration: duration
                });
                const newPackage = await packagesCollection.findOne({ _id: createdPackage.insertedId });

                res.status(201).json(newPackage);

            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });


        // Get All Packages
        app.get('/api/packages', async (req, res) => {
            try {

                const cursor = packagesCollection.find();
                const packages = await cursor.toArray()
                res.status(200).json(packages);

            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });


        // Get Single Package
        app.get('/api/packages/:id', async (req, res) => {
            const { id } = req.params;
            try {
                const singlePackage = await packagesCollection.findOne({ _id: ObjectId(id) });
                if (singlePackage) {
                    res.status(200).json(singlePackage);
                } else {
                    res.status(400).json({
                        message: 'Package Not Found.'
                    })
                }
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });


        // Create New Booking
        app.post('/api/orders/add', async (req, res) => {
            try {
                const createdOrder = await ordersCollection.insertOne({
                    ...req.body,
                    status:'pending'
                });
                const newOrder = await ordersCollection.findOne({ _id: createdOrder.insertedId });

                res.status(201).json(newOrder);

            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });

        // Get Orders by userId
        app.get('/api/orders/:userId', async (req, res) => {
            const { userId } = req.params;
            try {
                const cursor = ordersCollection.find({
                    userId
                        : userId
                });
                const orders = await cursor.toArray();

                res.status(200).json(orders);
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });


        // Get All Orders
        app.get('/api/orders', async (req, res) => {
            try {
                const cursor = ordersCollection.find();
                const orders = await cursor.toArray()
                res.status(200).json(orders);
            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        });

        // Delete Order by Id
        app.delete('/api/orders/:orderId', async (req, res) => {
            const { orderId } = req.params;
            try {
                
                const result = await ordersCollection.deleteOne({ _id: ObjectId(orderId) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ success: true })
                } else {
                    res.status(200).json({ success: false })
                }

            } catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
        })


    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})


