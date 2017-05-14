"use strict"
// const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = './address_book.db';
let db = new sqlite.Database(file);
const ContactGroup = require('./contact-group.js');

class Group {
  constructor(object) {
    this.id = object.id || null;
    this.name = object.name;
  }

  save() {
    let obj = this;
    let query;
    if(this.id !== null) {
      query = `UPDATE groups SET name = '${this.name}' WHERE id = ${this.id};`;
    } else {
      query = `INSERT INTO groups(name) VALUES ('${this.name}');`
    }
    db.serialize(function() {
      db.run(query, function (err, result){
        if(err) {
          console.log(err)
        } else {
          obj.id = this.lastID;
          console.log(`ID ${obj.id} has been inserted`)
        }
      })
    })
  }

  static add(object) {
    let name = object.name;

    let query = `INSERT INTO groups(name) VALUES ('${name}');`
    db.serialize(function() {
      db.run(query, function (err, result){
        if(err) {
          console.log(err)
        } else {
          console.log(`${name} has been inserted`)
        }
      })
    })
  }

  static showAll() {
    let query = `SELECT * FROM groups`;
    db.serialize(function() {
      db.all(query, (err, rows) => {
        if(err) console.log(err);
        console.log('ID | Name');
        rows.forEach(row => {
          console.log(`${row.id} | ${row.name}`)
        })
      })
    })
  }

  static update(changedName, id) {
    let query = `UPDATE groups SET 'name' = '${changedName}' WHERE id = ${id}`;
    db.serialize(function() {
      db.run(query, function (err, result){
        if(err) {
          console.log(err)
        } else {
          console.log(`ID ${id} has been updated`)
        }
      })
    })
  }

  static remove(id) {
    let query = `DELETE FROM groups WHERE id = ${id}`;
    db.serialize(function() {
      db.run(query, (err) => {
        if(err) console.log(err);
      })
    })
    ContactGroup.removedGroup(id)
  }
}

// contact.save()
Group.showAll()

module.exports = Group;