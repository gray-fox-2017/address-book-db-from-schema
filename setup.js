const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const fs = require('fs');
const db =  new sqlite.Database('address_book.db');

let dummy_contact = JSON.parse(fs.readFileSync('dummy_contact.json', 'utf-8'))
let dummy_group = JSON.parse(fs.readFileSync('dummy_group.json', 'utf-8'))


let CREATE_TABLE_CONTACTS = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), company VARCHAR(100), telp_number VARCHAR, email VARCHAR)`
let CREATE_TABLE_GROUP_CONTACT = `CREATE TABLE IF NOT EXISTS group_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contact INTEGER NOT NULL, id_group INTEGER NOT NULL, FOREIGN KEY(id_contact) REFERENCES contacts(id), FOREIGN KEY(id_group) REFERENCES groups(id))`
let CREATE_TABLE_GROUPS = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))`


let createTable = () =>{
  db.serialize(() =>{
    db.run(CREATE_TABLE_CONTACTS, (err)=>{
      if (!err) {
        console.log(`CREATE TABLE contacts SUCCESSFULL!!!`);
      }
    })

    db.run(CREATE_TABLE_GROUP_CONTACT, (err)=>{
      if (!err) {
        console.log(`CREATE TABLE group_contacts SUCCESSFULL!!!`);
      }
    })

    db.run(CREATE_TABLE_GROUPS, (err)=>{
      if (!err) {
        console.log(`CREATE TABLE groups SUCCESSFULL!!!`);
      }
    })
  })
}


let seedDataContact = () =>{
  for (var i in dummy_contact) {
    let seedData = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${dummy_contact[i].name}', '${dummy_contact[i].company}', '${dummy_contact[i].telp_number}', '${dummy_contact[i].email}')`

    db.serialize(()=>{
      db.run(seedData, (err)=>{
        if (!err) {
          console.log(`SEED DATA contact SUCCESSFULL!!!`);
        }
      })
    })
  }
}

let seedDataGroup = () =>{
  for (var i in dummy_group) {
    let seedData = `INSERT INTO groups (name) VALUES ('${dummy_group[i].name}')`

    db.serialize(()=>{
      db.run(seedData, (err)=>{
        if (!err) {
          console.log(`SEED DATA groups SUCCESSFULL!!!`);
        }
      })
    })
  }
}


const replServer = repl.start({prompt : ">>"});
replServer.context.createTable = createTable;
replServer.context.seedDataContact = seedDataContact;
replServer.context.seedDataGroup = seedDataGroup
