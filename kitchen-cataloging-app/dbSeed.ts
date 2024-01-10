// This file was used to seed the test database -- do not run this file.

// Initial mongo DB Atlas connection

const { MongoClient, ObjectId } = require('mongodb');

const url =
  "mongodb+srv://njhcode:gKckl1X2AZAqTblm@kitchen-cataloging-app.zgpby1t.mongodb.net/?retryWrites=true&w=majority";

//  Connect to the Atlas cluster
const client = new MongoClient(url);
const dbName = "testDB";

async function run() {
  try {
    // Connect to the Atlas cluster
    await client.connect();
    const db = client.db(dbName);
    // Reference the "people" collection in the specified database
    const col = db.collection("testCollection");
    // Create a new document
    // let newTestObject =
    //   {
    //     first: "Michael",
    //     last: "Scott",
    //   };

    // Insert the document into the specified collection
    // const document = await col.insertOne(newTestObject);
    // Find and return the document

    const foundDocument = await col.find();
    console.log(
      `Document found:\n ${JSON.stringify(foundDocument.first)} ${JSON.stringify(
        foundDocument.last
      )}`
    );
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
