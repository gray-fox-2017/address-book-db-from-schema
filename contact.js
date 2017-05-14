"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

// let replServer = repl.start('>> ');

export class Contacts {

  static addData(data) {
    let query = `INSERT INTO Contacts(name,company,telp_number,email) VALUES('${data.name}','${data.company}','${data.telp_number}','${data.email}');`;
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static updateData(data) {
    let query = `UPDATE Contacts SET name = '${data.name}', company = '${data.company}', telp_number = '${data.telp_number}', email = '${data.email}' WHERE Contacts.id = '${data.id}';`;
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static deleteData(id) {
    let query = `DELETE FROM Contacts WHERE Contacts.id = '${id}'`;
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static showData() {
    let showData = `SELECT * FROM Contacts`;
    db.serialize(function() {
      db.all(showData, function(err, rows) {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      });
    });
  }
}

// module.exports = Contacts;