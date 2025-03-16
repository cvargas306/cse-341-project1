const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

async function testDb() {
    const client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    const db = client.db("project1");

    // List all collections
    const collections = await db.listCollections().toArray();
    console.log("Collections in the DB:", collections.map(col => col.name));

    // Fetch documents from the contacts collection
    const contacts = await db.collection("contacts").find().toArray();
    console.log("Contacts in the DB:", contacts);

    // Count documents
    const count = await db.collection("contacts").countDocuments();
    console.log(`Total contacts found: ${count}`);

    client.close();
}

testDb().catch(console.error);
