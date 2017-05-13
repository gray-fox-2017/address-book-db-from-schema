"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite.Database(file);

 export class Groups {

  static insertGroup(name){
    let add = `INSERT INTO groups(name) VALUES('${name}')`;
    db.serialize(() => {
      db.run(add,(err) =>{
        if (err) {
          console.log(err);
        }else {
          console.log(add);
        }
      });
    });
  }

  static updateGroup(id,attribute,value){
    let update = `UPDATE groups SET ${attribute} = '${value}'
                  WHERE groups.id = ${id}`;
    db.serialize(() => {
      db.run(update, (err) => {
        if (err) {
          console.log(err);
        }else {
          console.log(update);
        }
      });
    });
  }

  static deleteGroup(id){
    let deleteData = `DELETE FROM groups WHERE groups.id = ${id}`;
    db.serialize(() => {
      db.run(deleteData,(err) => {
        if (err) {
          console.log(err);
        }else {
          console.log(deleteData);
        }
      });
    });
  }

  static showGroup(){
    let show = `SELECT groups.*, contact_detail.name AS name
                FROM groups, (SELECT contacts.name, contact_groups.group_id FROM contacts, contact_groups
                              WHERE contact_groups.contact_id = contacts.id) AS contact_detail
                WHERE groups.id = contact_detail.group_id`;
    db.serialize(() => {
      db.each(show, (err,rows) => {
        if (err) {
          console.log(err);
        }else {
          console.log(rows);
        }
      });
    });
  }

  static help(){
    let help = `insertGroup(name)\n updateGroup(id,attribute,value)\n deleteGroup(id)\n showGroup()\n help()`;
    console.log(help);
  }

}

// let replServer = repl.start('>> ');
// replServer.context.insertGroup = Groups.insertGroup;
// // replServer.context.updateGroup = Groups.updateGroup;
// // replServer.context.deleteGroup = Groups.deleteGroup;
// replServer.context.showGroup = Groups.showGroup;
// replServer.context.help = Groups.help;
