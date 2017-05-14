"use strict";

const sqlite3 = require('sqlite3').verbose();
//const db = new sqlite3.Database('address_book.db');
const fs = require('fs');

//contact and group seeds
var cs = JSON.parse(fs.readFileSync('contact.json','utf8'));
var gs = JSON.parse(fs.readFileSync('group.json','utf8'));
var gcs = JSON.parse(fs.readFileSync('group_contact.json','utf8'));

class Seed {
  constructor () {
    this.connection = new sqlite3.Database('address_book.db');
  }

  contacts() {
    let db = this.connection;
    for (let i = 0; i< cs.length; i++) {
      let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${cs[i].name}', '${cs[i].company}', '${cs[i].telp_number}', '${cs[i].email}')`;
      db.serialize( () => {
        db.run(query, (err) => {
          if(err) console.log(err);
        });
      });
    }
  }

  groups() {
    let db = this.connection;
    for (let i=0; i<gs.length; i++) {
      let query = `INSERT INTO groups (name) VALUES ('${gs[i].name}')`;
      db.serialize( () => {
        db.run(query, (err) => {
          if(err) console.log(err);
        });
      });
    }
  }

  groupsContacts() {
    let db = this.connection;
    for (let i=0; i<gcs.length; i++) {
      let query = `INSERT INTO groups_contacts (contact_id, group_id) VALUES ('${gcs[i].contact_id}','${gcs[i].group_id}')`;
      db.serialize( () => {
        db.run(query, (err) => {
          if(err) console.log(err);
        });
      });
    }
  }
}

module.exports = Seed;
