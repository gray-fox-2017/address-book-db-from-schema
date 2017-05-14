"use strict"

//write your code here
const repl = require('repl');
const sqlite3 = require('sqlite3').verbose();

let file = 'address_book.db'
let db = new sqlite3.Database(file);

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

let createTable = () => {
  db.serialize(function() {
    let tableArr = [tableContacts, tableGroups, tableConjunction];
    for (let i=0; i<tableArr.length; i++)
    db.run(tableArr[i], function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Table created');
      }
    })
  })
}

let insertData = () => {
  db.serialize(function() {
    let dataArr = [conjuntionInsert]
    for(let i=0;i<dataArr.length; i++)
    db.run(dataArr[i], (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Data inserted!');
      }
    })
  })
}

let tableContacts = "CREATE TABLE Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), company VARCHAR(100), telp_number VARCHAR(30), email VARCHAR(100))"
let tableGroups = "CREATE TABLE Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))"
let tableConjunction = "CREATE TABLE Group_Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, groups_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contacts(id), FOREIGN KEY(groups_id) REFERENCES Groups(id))"

let contactsInsert = "INSERT INTO Contacts (name, company, telp_number, email) VALUES ('Andrew Senewe', 'SDH', '081234566543', 'as31@gmail.com')"
let groupInsert = "INSERT INTO Groups (name) VALUES ('FireFox')"
let conjuntionInsert = `INSERT INTO Group_Contacts (contact_id, groups_id) VALUES(1,1);`;

replServer.context.createTable = createTable;
replServer.context.insertData = insertData;