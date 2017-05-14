"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite.Database(file);

export class Groups {

  static insertGroup(name) {
    let query = `INSERT INTO Groups(name) VALUES('${name}')`;
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static updateGroup(id, attribute, value) {
    let query = `UPDATE Groups SET ${attribute} = '${value}' WHERE Groups.id = ${id}`;
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteGroup(id) {
    let query = `DELETE FROM Groups WHERE Groups.id = ${id}`;
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static showGroup() {
    let show = 'SELECT * FROM Groups';
    db.each(show, (err, rows) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rows);
      }
    });
  }
}

// module.exports = Groups;