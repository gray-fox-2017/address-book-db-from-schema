"use strict"
//your code bellow
const repl = require('repl')
const sqlite = require('sqlite3').verbose()
let file = 'address_book.db'
const db = new sqlite.Database(file)
const fs = require('fs')

var create_table_contacts = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCEREMENT, name VARCHAR(100), company VARCHAR(100), phone VARCHAR(100), email VARCHAR(150));`
var create_table_groups = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCEREMENT, name VARCHAR(100));`
var create_table_contactsGroup = `CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCEREMENT, group_id INTEGER, contact_id INTEGER, FOREIGN KEY group_id PREFERENCES groups (id), FOREIGN KEY contacts_id PREFERENCES contacts (id));`

function create_table () {
  db.serialize(function() {
    db.run(create_table_contacts, (err) => {
      if(!err) {
        console.log(`table created!`)
      } else {
        console.log(err)
      }
    })
    db.run(create_table_groups, (err) => {
      if (!err) {
        console.log(`table created`)
      } else {
        console.log(err)
      }
    })
    db.run(create_table_contactsGroup, (err) => {
      if(!err) {
        console.log(`table created!`)
      } else {
        console.log(err)
      }
    })
  })
}

let initData (contactsFromJSON, groupsFromJSON, contactGroup) => {
  let insert_contact = `INSERT INTO contacts (name, company, email, phone_number) VALUES (?,?,?,?);`
  let insert_group = `INSERT INTO groups (name) VALUES (?);`
  let insert_contact_group = `INSERT INTO contact_groups (group_id, contact_id) VALUES (?,?);`
  db.serialize(() => {
    for (let i=0; i<contactsFromJSON.length; i++){
      db.run(insert_contact, [contactsFromJSON[i].name, contactsFromJSON[i].company, contactsFromJSON[i].email, contactsFromJSON[i].phone_number],
        (err) => {
         if(!err){
           console.log(`Contact is migratesd to table`);
         } else {
           console.log(err)
         }
      })
    }
    for (let j=0; j<groupsFromJSON.length; j++){
      db.run(insert_group, [groupsFromJSON[j].name], (err) => {
        if(!err){
          console.log(`Group is migrated to table`);
        } else {
          console.log(err);
        }
      })
    }
    for (let k=0; k<contactGroup.length; k++){
      db.run(insert_contact_group, [contactGroup[k].group_id, contactGroup[k].contact_id], (err) => {
        if (!err) {
          console.log(`Contact-groups is migrated to table`);
        } else {
          console.log(err);
        }
      })
    }
  })
}
create_table()
let contactsData = JSON.parse(fs.readFileSync('contacts.json').toString());
let groupsData = JSON.parse(fs.readFileSync('groups.json').toString());
let contactGroupData = JSON.parse(fs.readFileSync('contacts_groups.json').toString());
initData(contactsData, groupsData, contactGroupData);
