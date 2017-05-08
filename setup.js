"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

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
var createTableContacts = "CREATE TABLE IF NOT EXISTS contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(40), company VARCHAR(100), telp_number VARCHAR(25), email VARCHAR(100))";
var createTableGroups = "CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(40))";
var createTableGroupsContacts = "CREATE TABLE IF NOT EXISTS groups_contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, groups_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id), FOREIGN KEY(groups_id) REFERENCES groups(id))";


// seed data
var contactsData = "INSERT INTO contacts (name, company, telp_number, email) VALUES ('Priambodo Kurniawan', 'Iam Design', '089694409175', 'priambodo@gmail.com'),('John Doe', 'Lubricant Inc', '0896944987175', 'john_doe@gmail.com'),('Novan Yahya', 'Crab Street', '089876609175', 'novanyahya@gmail.com'),('Wildy Surya', 'Sesame Street', '089876609876', 'widly.surya@gmail.com');"
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
let seedContacts = () => {
  serializeRun(contactsData, 'Data berhasil diinput.')
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
