// This file is intended for database connection and query functions.
// It exports functions like connectToDatabase and queryDatabase to interact with the database.

const { MongoClient } = require('mongodb');

const uri = 'your_mongodb_connection_string'; // Replace with your MongoDB connection string
let client;

async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
    }
    return client.db('your_database_name'); // Replace with your database name
}

async function queryDatabase(collectionName, query) {
    const db = await connectToDatabase();
    const collection = db.collection(collectionName);
    return await collection.find(query).toArray();
}

module.exports = {
    connectToDatabase,
    queryDatabase,
};