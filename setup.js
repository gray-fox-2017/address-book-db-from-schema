"use strict"

const sqlite = require('sqlite3').verbose();

var file = './address_book.db';
//var db = new sqlite.Database(file);

//SQL Statement
var CREATE_CONTACTS = `CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100), company VARCHAR(100), telp_number VARCHAR(100) UNIQUE, email VARCHAR(100) UNIQUE)`;
var CREATE_GROUPS = `CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100))`;
var CREATE_GROUPS_CONTACTS = `CREATE TABLE IF NOT EXISTS groups_contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id), FOREIGN KEY(group_id) REFERENCES groups(id))`;

class Setup {
  constructor (file) {
    this.connection = new sqlite.Database(file)
  }

  createTables() {
    let db = this.connection;
    db.serialize(() => {
      db.run(CREATE_CONTACTS, err => {
        err ? console.log(err) : console.log(`Table contacts is created`);
      });
      db.run(CREATE_GROUPS, err => {
        err ? console.log(err) : console.log(`Table groups is created`);
      });
      db.run(CREATE_GROUPS_CONTACTS, err => {
        err ? console.log(err) : console.log(`Table groups_contacts is created`);
      });
    });
  }
}

let setup = new Setup('./address_book.db');
setup.createTables();

module.exports = Setup;
