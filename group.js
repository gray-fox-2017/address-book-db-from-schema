"use strict";

const sqlite = require('sqlite3').verbose();

class Group {
  constructor (groupObj) {
    this.id = groupObj.id || null;
    this.name = groupObj.name;
    this.connection = new sqlite.Database('address_book.db');
  }

  static create(db, group) {
    let query = `INSERT INTO groups (name) VALUES ('${group.name}')`;
    db.run(query, function(err) {
      (err) ? console.log(err) : console.log(`Group has been added.`);
    });
  }

  static update(db, group) {
    let query = `UPDATE groups SET name = '${group.name}' WHERE id = ${group.id}`;
    db.serialize ( () => {
      db.run(query, (err) => {
        (err) ? console.log(err) : console.log(`Group data is updated`);
      });
    });
  }

  static delete(db, id) {
    let query = `DELETE FROM groups where id = ${id}`;
    let queryAssoc = `DELETE FROM groups_contacts where group_id = ${id}`;
    db.serialize( () => {
      db.run(query, (err) => {
        (err) ? console.log(err) : console.log(`Group data has been deleted.`);
      });
      // remove connection in contacts_groups
      db.run(queryAssoc);
    });
  }

  static show(db, id) {
    let query = `SELECT groups.id as id, groups.name as Name, contacts.name as ContactName FROM contacts LEFT OUTER JOIN groups_contacts ON contacts.id = groups_contacts.contact_id LEFT OUTER JOIN groups ON groups.id = groups_contacts.group_id WHERE groups.id = ${id}`;
    db.serialize( () => {
      db.all(query, (err, rows) => {
        if (!err) {
          console.log(`ID: ${rows[0].id}\nName: ${rows[0].Name}\nMembers: `);
          for (let i=0; i<rows.length; i++) {
            console.log(rows[i].ContactName);
          }
        } else console.log(err);
      });
    });
  }

  save() {
    let db = this.connection;
    if (this.id === null) {
      Group.create(db,this);
      db.serialize( () => {
        db.all(`SELECT id FROM groups WHERE name = '${this.name}'`, (err,
          rows) => {
            if (!err) this.id = rows[rows.length-1].id;
          });
      });
    }
    else {
      Group.update(db,this);
    }
  }
}

module.exports = Group;
