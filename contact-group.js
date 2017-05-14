"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite.Database(file);

// let replServer = repl.start('>> ')

export class Contact_Groups {

  static insertContactIdToGroup(contact_id, group_id){
    let query = `INSERT INTO Group_Contacts(contact_id,group_id) VALUES(${contact_id},${group_id})`;
    db.serialize(() => {
      db.run(query,(err) => {
          if (err) {
            console.log(err);
          }
      });
    });
  }

  static showContactGroup(){
    let query = `SELECT * FROM Group_Contacts`;
    db.serialize(() => {
      db.all(query,(err,rows) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rows);
        }
      });
    });
  }
}

// module.exports = Contact_Groups;