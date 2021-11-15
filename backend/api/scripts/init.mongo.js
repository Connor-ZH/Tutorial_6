db.createCollection('entries')
db.entries.createIndex({ serial_number: 1 }, { unique: true });
db.entries.createIndex({ name: 1 });
db.entries.createIndex({ phone_number: 1 });
db.entries.createIndex({ time_stamp: 1 });

db.entries.remove({});
const entries_db = [
    {serial_number:"1", name:"David", phone_number:"8923921", time_stamp:"2021-11-14 20:30:01"},
    {serial_number:"2", name:"John", phone_number:"89239223", time_stamp:"2021-11-14 20:30:01"},
    {serial_number:"3", name:"Max", phone_number:"89232413", time_stamp:"2021-11-14 20:30:01"},
    {serial_number:"4", name:"Curry", phone_number:"899213", time_stamp:"2021-11-14 20:30:01"},
    {serial_number:"5", name:"James", phone_number:"8921", time_stamp:"2021-11-14 20:30:01"},
    {serial_number:"6", name:"Harris", phone_number:"8939213", time_stamp:"2021-11-14 20:31:01"},
    {serial_number:"7", name:"Henry", phone_number:"8939213", time_stamp:"2021-11-14 20:32:11"},
    {serial_number:"8", name:"Kobe", phone_number:"23946213", time_stamp:"2021-11-14 20:33:01"},
    {serial_number:"9", name:"Bryant", phone_number:"92329213", time_stamp:"2021-11-14 20:34:11"},
    {serial_number:"10", name:"Java", phone_number:"239213", time_stamp:"2021-11-14 20:35:01"},
    {serial_number:"11", name:"Python", phone_number:"89213", time_stamp:"2021-11-14 20:38:01"},
    {serial_number:"12", name:"C", phone_number:"81323412", time_stamp:"2021-11-14 20:39:01"},
    {serial_number:"13", name:"Rust", phone_number:"32149213", time_stamp:"2021-11-14 21:30:01"},
    {serial_number:"14", name:"King", phone_number:"41939213", time_stamp:"2021-11-14 22:30:01"},
    {serial_number:"15", name:"Queen", phone_number:"8359213", time_stamp:"2021-11-14 23:30:01"},
    {serial_number:"16", name:"Stack", phone_number:"8959213", time_stamp:"2021-11-14 23:31:01"},
    {serial_number:"17", name:"Tree", phone_number:"822423", time_stamp:"2021-11-14 23:30:01"},
    {serial_number:"18", name:"Mass", phone_number:"1239213", time_stamp:"2021-11-15 20:30:01"},
    {serial_number:"19", name:"Earth", phone_number:"2239213", time_stamp:"2021-11-15 20:31:01"},
];

db.entries.insertMany( entries_db);
