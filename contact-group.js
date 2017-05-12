"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = "address_book.db";
let db = new sqlite.Database(file);

let replServer = repl.start('>> ')

 class Contact_Groups {

  static insertContactIdToGroup(contact_id, group_id){
    let add = `INSERT INTO contact_groups(contact_id,group_id) VALUES(${contact_id},${group_id})`;
    db.serialize(() => {
      db.run(add,(err) => {
          if (err) {
            console.log(err);
          }else {
            console.log(add);
          }
      });
    });
  }

  static showContactGroup(){
    let show = `SELECT * FROM contact_groups`;
    db.serialize(() => {
      db.each(show,(err,rows) => {
        if (err) {
          console.log(err);
        }else {
          console.log(rows);
        }
      });
    });
  }

  static help(){
    let show = `insertContactIdToGroup(contact_id, group_id)\n showContactGroup()\n help()`;
    console.log(show);
  }

}


replServer.context.insertContactIdToGroup = Contact_Groups.insertContactIdToGroup;
replServer.context.showContactGroup = Contact_Groups.showContactGroup;
replServer.context.help = Contact_Groups.help;
