'use strict'

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const file = 'addressbook.db';
let db = new sqlite.Database(file);
let CREATE_TABLE = 'CREATE TABLE IF NOT EXISTS ';
let CREATE_CONTACT = CREATE_TABLE + `contacts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255),
  company VARCHAR(255),
  telp_number VARCHAR(10),
  email VARCHAR(40)
)`;
let CREATE_GROUP = CREATE_TABLE + `groups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255)
)`;
let CREATE_CGROUP = CREATE_TABLE + `cgroups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  contact_id INTEGER,
  group_id INTEGER,
  FOREIGN KEY(contact_id) REFERENCES contacts(contact_id),
  FOREIGN KEY(group_id) REFERENCES groups(group_id)

)`;

let INSERT_DATA_C = `INSERT INTO contacts
(name,company,telp_number,email) VALUES
('contact1','PTcontact1','085813372797','contact1@yahoo.com'),
('contact2','PTcontact2','085813372797','contact2@yahoo.com'),
('contact3','PTcontact3','085813372797','contact3@yahoo.com'),
('contact4','PTcontact4','085813372797','contact4@yahoo.com'),
('contact5','PTcontact5','085813372797','contact5@yahoo.com'),
('contact6','PTcontact6','085813372797','contact6@yahoo.com')`;

let INSERT_DATA_G = `INSERT INTO groups
(name) VALUES
('group1'),('group2'),('group3'),('group4'),('group5'),('group6'),
('group7'),('group8'),('group9'),('group10'),('group11')`;
let INSERT_DATA_CG = `INSERT INTO cgroups
(contact_id,group_id) VALUES
(1,2),(1,3),(1,4),(2,5),(2,7),(3,4),(3,2),(3,3),(3,7),(3,8),(4,11),
(5,9),(5,2),(6,10),(6,11)`;

const createTable = () => {
  db.serialize(function(){
    db.run(CREATE_CONTACT, (err) => { console.log(( err ? err: 'CREATE CONTACT')) });
    db.run(CREATE_GROUP, (err) => { console.log(( err ? err: 'CREATE GROUP')) });
    db.run(CREATE_CGROUP, (err) => { console.log(( err ? err: 'CREATE CGROUP')) });
  });
}

const seedTable = () => {
  db.serialize(()=>{
    db.run(INSERT_DATA_C, (err) => { console.log(( err ? err: 'INSERTED CONTACT')) });
    db.run(INSERT_DATA_G, (err) => { console.log(( err ? err: 'INSERTED GROUP')) });
    db.run(INSERT_DATA_CG, (err) => { console.log(( err ? err: 'INSERTED CGROUP')) });

  })
}
module.exports = {createTable,seedTable};