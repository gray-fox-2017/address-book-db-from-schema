"use strict"

//write your code here

const repl = require('repl')
const sqlite = require('sqlite3').verbose()
const fs = require('fs')

let file = 'address_book.db'
let db = new sqlite.Database(file)

//sql statement
let CREATE_TABLE_CONTACT = `CREATE TABLE IF NOT EXISTS contacts
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50), company VARCHAR(100), telp_number VARCHAR(20), email VARCHAR(100))`
let CREATE_TABLE_GRUP = `CREATE TABLE IF NOT EXISTS groups
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(50))`
let CREATE_TABLE_GRUP_CONTACT = `CREATE TABLE IF NOT EXISTS groups_contacts
                  (id INTEGER PRIMARY KEY AUTOINCREMENT, id_groups INTEGER, id_contacts INTEGER)`


let SEED_DATA = `INSERT INTO murid (first_name, last_name, gender, birthday, email, phone)
                            VALUES ('Erwin','Ramadhan','laki-laki',17-02-1995,'erwin@gmail.com','082242361317')`;
//
//create table
let createTable_contacts = () => {
  //run sql one at a time
  db.serialize(function() {
    //create TABLE
    db.run(CREATE_TABLE_CONTACT, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('success createTable!');
      }
    })
    return true
  })
}

let createTable_groups = () => {
  //run sql one at a time
  db.serialize(function() {
    //create TABLE
    db.run(CREATE_TABLE_GRUP, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('success createTable!');
      }
    })
    return true
  })
}

let createTable_groups_contacts = () => {
  //run sql one at a time
  db.serialize(function() {
    //create TABLE
    db.run(CREATE_TABLE_GRUP_CONTACT, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('success createTable!');
      }
    })
    return true
  })
}
let seedContacts = () => {
  let contacts = JSON.parse(fs.readFileSync('dummies_contacts.json','utf8'));
  for (let i=0; i<contacts.length; i++){
    db.serialize(function(){
      let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${contacts[i].name}', '${contacts[i].company}', '${contacts[i].phone_number}', '${contacts[i].email}')`
      db.run(query, function(err){
        if (!err) {
          //console.log(err.message);
          console.log('seed contacts success!');
        } else {
          console.log('fail: '+ err);
        }
      })
    })
  }
}
let seedGroups = () => {
  let groups = JSON.parse(fs.readFileSync('dummies_groups.json','utf8'));
  for (let i=0; i<groups.length; i++){
    db.serialize(function(){
      //let query = `INSERT INTO groups (name) VALUES ('${groups[i].name}')`
      db.run(`INSERT INTO groups (name) VALUES ('${group[i].name}')`,function(err){
        if (!err) {
          //console.log(err.message);
          console.log('seed groups success!');
        } else {
          console.log('fail: '+ err);
        }
      })
    })
  }
}
let seedGroupsContacts = () => {
  //let groups = JSON.parse(fs.readFileSync('dummies_groups.json','utf8'));
  //for (let i=0; i<groups.length; i++){
    db.serialize(function(){
      let query = `INSERT INTO groups_contacts (id_groups, id_contacts) VALUES ('${id_groups}','${id_contacts}')`
      db.run(query, function(err){
        if (!err) {
          //console.log(err.message);
          console.log('seed groups success!');
        } else {
          console.log('fail: '+ err);
        }
      })
    })
  //}
}

let replServer =   repl.start({
  prompt : '>>',
  input  : process.stdin,
  output : process.stdout

})


//replServer.context.seedData = seedData;
replServer.context.createTable_groups = createTable_groups;
replServer.context.createTable_contacts = createTable_contacts;
replServer.context.createTable_groups_contacts = createTable_groups_contacts;

replServer.context.seedGroups = seedGroups;
replServer.context.seedContacts = seedContacts;
replServer.context.seedGroupsContacts = seedGroupsContacts;
