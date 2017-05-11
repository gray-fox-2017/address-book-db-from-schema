//This file for seeding
"use strict"
var sqlite3 = require('sqlite3').verbose();
var file = 'address_book.db';
var db = new sqlite3.Database(file);
var repl = require('repl');
var REPLServer = repl.start({prompt : '> '});
var fs = require('fs');
var contacts_json = JSON.parse(fs.readFileSync('contacts.json').toString());
var groups_json = JSON.parse(fs.readFileSync('groups.json').toString());
var contacts_groups_json = JSON.parse(fs.readFileSync('contacts_groups.json').toString());

//Create table contact
var CREATE_TABLE_CONTACT = "CREATE TABLE contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(25) NOT NULL, lastname VARCHAR(25), company VARCHAR(30) , phone VARCHAR(17) NOT NULL UNIQUE, email VARCHAR(30) );";
let createTableContact = () =>{
  //Run SQL one at a time
  db.serialize(function(){
    //Create TABLE
    db.run(CREATE_TABLE_CONTACT, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('CREATE_TABLE_CONTACT');
      }
    });
  });
}

//Create table group
var CREATE_TABLE_GROUP = "CREATE TABLE groups(id INTEGER PRIMARY KEY AUTOINCREMENT, group_name VARCHAR(25) NOT NULL UNIQUE);";
let createTableGroup = () =>{
  //Run SQL one at a time
  db.serialize(function(){
    //Create TABLE
    db.run(CREATE_TABLE_GROUP, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('CREATE_TABLE_GROUP');
      }
    });
  });
}

//Create conjunction table
var CREATE_TABLE_CONTACT_GROUP = "CREATE TABLE contacts_groups(id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER , FOREIGN KEY (group_id) REFERENCES groups(id), FOREIGN KEY (contact_id) REFERENCES contacts(id));";
let createTableContactGroup = () =>{
  //Run SQL one at a time
  db.serialize(function(){
    //Create TABLE
    db.run(CREATE_TABLE_CONTACT_GROUP, function(err){
      if (err){
        console.log(err);
      } else {
        console.log('CREATE_TABLE_CONTACT_GROUP');
      }
    });
  });
}
//Seed contacts, seed inside loop
let seedContacts = () => {
  for (let i = 0; i < contacts_json.length; i++){
    var SEED_CONTACTS_DATA = `INSERT INTO contacts (firstname, lastname, phone,email) VALUES ('${contacts_json[i].firstname}', '${contacts_json[i].lastname}', '${contacts_json[i].phone}', '${contacts_json[i].email}');`;
      db.parallelize(function(){
        db.run(SEED_CONTACTS_DATA.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('SEED_CONTACTS_DATA');
          }
        });
      });
  }
}
//Seed groups
let seedGroups = () => {
  for (let i = 0; i < groups_json.length; i++){
    var SEED_GROUPS_DATA = `INSERT INTO groups (group_name) VALUES ('${groups_json[i].group_name}');`;
      db.parallelize(function(){
        db.run(SEED_GROUPS_DATA.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('SEED_GROUPS_DATA');
          }
        });
      });
  }
}
//Seed contacts_groups
let seedContactsGroups = () => {
  for (let i = 0; i < contacts_groups_json.length; i++){
    var SEED_CONTACTS_GROUPS_DATA = `INSERT INTO contacts_groups (contact_id,group_id) VALUES ('${contacts_groups_json[i].contact_id}','${contacts_groups_json[i].group_id}');`;
      db.parallelize(function(){
        db.run(SEED_CONTACTS_GROUPS_DATA.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('SEED_CONTACTS_GROUPS_DATA');
          }
        });
      });
  }
}


REPLServer.context.CREATE_TABLE_CONTACT = createTableContact;
REPLServer.context.CREATE_TABLE_GROUP = createTableGroup;
REPLServer.context.CREATE_TABLE_CONTACT_GROUP = createTableContactGroup;
REPLServer.context.SEED_CONTACTS = seedContacts;
REPLServer.context.SEED_GROUPS = seedGroups;
REPLServer.context.SEED_CONTACTS_GROUPS = seedContactsGroups;
