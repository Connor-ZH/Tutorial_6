db.entries.remove({});


db.entries.createIndex({ serial_number: 1 }, { unique: true });
db.entries.createIndex({ name: 1 });
db.entries.createIndex({ phone_number: 1 });
db.entries.createIndex({ time_stamp: 1 });
