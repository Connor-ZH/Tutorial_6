const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/issuetracker';

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  client.connect(function(err, client) {
    if (err) {
      callback(err);
      return;
    }
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('entries');
    const entry = { serial_number: 1, name: 'John', phone_number:"89421234",time_stamp:"2021-10-22" };
    collection.insertOne(entry, function(err, result) {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId}).toArray(function(err, docs){
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of find:\n', docs);
        collection.updateOne({_id: result.insertedId},{$set: {name: "Max",phone_number: "08122222",}},function(err, temp){
          if (err) {
            client.close();
            callback(err);
            return;
          }
          console.log('successfully update :\n', result.insertedId);
          collection.deleteOne({_id: result.insertedId},function(err, cur){
            if (err) {
              client.close();
              callback(err);
              return;
            };
            console.log('successfully delete:\n',result.insertedId);
            client.close();
            callback(err);
          });
        });
      });
    });
  });
}

async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('entries');
    const entry = { serial_number: 2, name: 'David', phone_number:"8123114",time_stamp:"2021-10-23" };
    const result = await collection.insertOne(entry);
    console.log('Result of insert:\n', result.insertedId);
    const docs = await collection.find({ _id: result.insertedId }).toArray();
    console.log('Result of find:\n', docs);
    await collection.updateOne({_id: result.insertedId },{$set: {name: "Max",phone_number: "08122222",}});
    const docs_updated = await collection.find({ _id: result.insertedId })
    .toArray();
    console.log('Result of update:\n', docs_updated);
    await collection.deleteOne({_id:result.insertedId});
    console.log('successfully delete _id:\n', result.insertedId);
  } catch(err) {
    console.log(err);
  } finally {
    client.close();
  }
}

testWithCallbacks(function(err) {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
