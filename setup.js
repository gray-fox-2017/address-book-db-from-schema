"use strict"

const fs = require('fs');
const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var file = 'address_book.db';
var db = new sqlite.Database(file);

let replServer = repl.start('>> ');
let address_book = JSON.parse(fs.readFileSync("address_book.json","utf8"));

// SQL Query
let CREATE_TABLE_CONTACTS = "CREATE TABLE contacts(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), company VARCHAR(100), telp_number VARCHAR, email TEXT)";
let CREATE_TABLE_GROUPS = "CREATE TABLE groups(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))";
let CREATE_TABLE_CONTACT_GROUPS = "CREATE TABLE contact_groups(id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER NOT NULL, group_id INTEGER NOT NULL, FOREIGN KEY(group_id) REFERENCES groups(id), FOREIGN KEY(contact_id) REFERENCES contacts(id))";

let createContact = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE_CONTACTS, function(err){
      if (err) {
        console.log(err);
      }else {
        console.log('CREATE_TABLE_CONTACTS');
      }
    });
  });
}

let createGroup = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE_GROUPS, function(err){
      if (err) {
        console.log(err);
      }else {
        console.log('CREATE_TABLE_GROUPS');
      }
    })
  });
}

let createContactGroup = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE_CONTACT_GROUPS, function(err){
      if (err) {
        console.log(err);
      }else {
        console.log('CREATE_TABLE_CONTACT_GROUPS');
      }
    });
  });
}

// INSERT TABLE
let seedContact = () => {
  db.serialize(function(){
    for (var i = 0; i < address_book.Contacts.length; i++) {
      let seedDataContact = `INSERT INTO contacts(name,company,telp_number,email) VALUES('${address_book.Contacts[i].name}','${address_book.Contacts[i].company}','${address_book.Contacts[i].telp_number}','${address_book.Contacts[i].email}');`;
      db.run(seedDataContact,function(err){
        if (err) {
          console.log(err);
        }else {
          console.log(seedDataContact);
        }
      });
    }
  });
}

let seedGroup = () => {
  db.serialize(function(){
    for (var i = 0; i < address_book.Groups.length; i++) {
      let seedDataGroup = `INSERT INTO groups(name) VALUES('${address_book.Groups[i].name}');`;
      db.run(seedDataGroup, function(err){
        if (err) {
          console.log(err);
        }else {
          console.log(seedDataGroup);
        }
      });
    }
  });
}

let seedContactGroup = () => {
  db.serialize(function(){
    for (var i = 0; i < address_book.Contact_Groups.length; i++) {
      let seedDataContactGroup = `INSERT INTO contact_groups(contact_id, group_id) VALUES('${address_book.Contact_Groups[i].contact_id}','${address_book.Contact_Groups[i].group_id}');`;
      db.run(seedDataContactGroup,function(err){
        if (err) {
          console.log(err);
        }else {
          console.log(seedDataContactGroup);
        }
      });
    }
  });
}

replServer.context.createContact = createContact;
replServer.context.createGroup = createGroup;
replServer.context.createContactGroup = createContactGroup;
replServer.context.seedDataContact = seedDataContact;
replServer.context.seedDataGroup = seedDataGroup;
replServer.context.seedDataContactGroup = seedDataContactGroup;
