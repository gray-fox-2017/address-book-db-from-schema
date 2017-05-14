"use strict"
// const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = './address_book.db';
let db = new sqlite.Database(file);

class ContactGroup {
  constructor(object) {
    this.id = object.id || null;
    this.contact_id = object.contact_id;
    this.groups_id = object.groups_id;
  }

  save() {
    let obj = this;
    let query;
    if(this.id !== null) {
      query = `UPDATE contact_group SET contact_id = '${this.contact_id}', groups_id = '${this.groups_id}' WHERE id = ${id};`;
    } else {
      query = `INSERT INTO contact_group(contact_id, groups_id) VALUES ('${this.contact_id}', '${this.groups_id}');`
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

  static assign(contact_id, groups_id) {
    let query = `INSERT INTO contact_group(contact_id, groups_id) VALUES ('${contact_id}', '${groups_id}');`
    db.serialize(function() {
      db.run(query, function (err, result){
        if(err) {
          console.log(err)
        } else {
          console.log(`${contact_id} has been registered to ${groups_id}`)
        }
      })
    })
  }

  static showAll() {
    let query = `SELECT * FROM contact_group`;
    db.serialize(function() {
      db.all(query, (err, rows) => {
        if(err) console.log(err);
        console.log('ID | Contact ID | Group ID');
        rows.forEach(row => {
          console.log(`${row.id} | ${row.contact_id} | ${row.groups_id}`)
        })
      })
    })
  }

  static update(attr, val, id) {
    let query = `UPDATE contact_group SET '${attr}' = '${val}' WHERE id = ${id}`;
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

  static removedGroup(groups_id) {
    let query = `DELETE FROM contact_group WHERE groups_id = ${groups_id}`;
    db.serialize(function() {
      db.run(query, (err) => {
        if(err) console.log(err);
      })
    })
  }
}

module.exports = ContactGroup;
