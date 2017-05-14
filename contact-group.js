"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

let file = 'address_book.db'
let db = new sqlite.Database(file)

class ContactGroup {
  constructor(components) {
    let id = null
    let id_group =  components.id_group
    let id_contact = components.id_contact

  }

  save() {
    if (this.id === null) {
      db.serialize(function() {
        let q = `INSERT INTO groups_contacts (id_groups, id_contacts) VALUES ('${id_groups}','${id_contacts}')`
        db.run(q,function(err) {
          if (err) {
            console.log(err);
          } else {
            this.id = this.lastID;
            console.log(`contacts updated`);
          }
        });
      });
    } else {
      db.serialize(function() {
        let q = `UPDATE groups_contacts SET id_groups = '${id_groups}', id_contacts = '${id_contacts}' WHERE id = ${id}`
        db.run(q, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`contacts updated`);
          }
        });
      });
    }
  }

  assign(id_groups, id_contacts) {
    db.serialize(function() {
      let q = `insert into groups_contacts (id_groups, id_contacts) VALUES ('${id_groups}','${id_contacts}')`
      db.run(q, function(err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('success');
        }
      })
    })

  }

}

export default ContactGroup