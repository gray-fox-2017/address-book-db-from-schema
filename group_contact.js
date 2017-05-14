"use strict";

const sqlite = require('sqlite3').verbose();

class Group_Contact {
  constructor(component) {
    this.id = component.id || null;
    this.group_id = component.group_id;
    this.contact_id = component.contact_id;
  }

  static assign(db, gc) {
    let query = `INSERT INTO groups_contacts (contact_id, group_id) VALUES (${gc.contact_id}, ${gc.group_id})`;
    db.serialize( () => {
      db.run(query, (err) => {
        (err) ? console.log(err) : console.log(`Assigning contact ${gc.contact_id} to group ${gc.group_id} success.`);
      });
    });
  }
}

module.exports = Group_Contact;
