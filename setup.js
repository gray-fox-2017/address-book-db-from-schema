"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const fs = require('fs');

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

function serializeRun(query, message){
  db.serialize(function() {
    db.run(query, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(message)
      }
    });
  });
}

var file= 'contacts.db';
var db= new sqlite.Database(file);

// create table
var createTableContacts = "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(40), company VARCHAR(100), telp_number VARCHAR(25), email VARCHAR(100) UNIQUE)";
var createTableGroups = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(40))";
var createTableGroupsContacts = "CREATE TABLE IF NOT EXISTS groups_contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, groups_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id), FOREIGN KEY(groups_id) REFERENCES groups(id))";


// seed data
var groupsData = "INSERT INTO groups (name) VALUES ('Developer'), ('Front End'), ('Designer'), ('Back End');"
var groupsContactsData = "INSERT INTO groups_contacts (contact_id, groups_id) VALUES (1,1), (2,2), (3,3), (4,4);"

// table
let tableContacts = () => {
  serializeRun(createTableContacts, 'Table contact telah dibuat.')
}
let tableGroups = () => {
  serializeRun(createTableGroups, 'Table group telah dibuat.')
}
let tableGroupsContacts = () => {
  serializeRun(createTableGroupsContacts, 'Table groups_contacts telah dibuat.')
}

// seed
var seedContacts = () => {
  let contacts = JSON.parse(fs.readFileSync('contact.json', 'utf8'))
  contacts.forEach((contact) => {
    db.serialize(function(){
      db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${contact.name}', '${contact.company}', '${contact.telp_number}', '${contact.email}')`, function(err){
        if (err) {
          console.log(err);
        } else {
          console.log('Data berhasil ditambahkan')
        }
      })
    })
  })
}
let seedGroups = () => {
  serializeRun(groupsData, 'Data berhasil diinput.')
}
let seedGroupsContacts = () => {
  serializeRun(groupsContactsData, 'Data berhasil diinput.')
}

replServer.context.tableContacts = tableContacts;
replServer.context.tableGroups = tableGroups;
replServer.context.tableGroupsContacts = tableGroupsContacts;

replServer.context.seedContacts = seedContacts;
replServer.context.seedGroups = seedGroups;
replServer.context.seedGroupsContacts = seedGroupsContacts;
