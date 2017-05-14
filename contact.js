"use strict";

//const repl = require('repl');
const sqlite = require('sqlite3').verbose();

//let replServer = repl.start({
//  prompt: `~ `,
//  input: process.stdin,
//  output: process.stdout
//});

class Contact {
  constructor (contactObj) {
    this.id = contactObj.id || null;
    this.name = contactObj.name;
    this.company = contactObj.company || null;
    this.phone = contactObj.phone || null;
    this.email = contactObj.email || null;
    this.connection = new sqlite.Database('address_book.db');
  }

  static create(db, contact) {
    let checkPhone = Contact.phoneValidation(contact.phone);
    let checkEmail = Contact.emailValidation(contact.email);
    if (checkPhone === false || checkEmail === false) {
      if (checkPhone === false) {
        console.log('Phone number has to be between 10-13 numbers');
      }
      if (checkEmail === false) {
        console.log(`Your email format is not accepted.`);
      }
      return ;
    }
    let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${contact.name}', '${contact.company}', '${contact.phone}', '${contact.email}')`;
    db.serialize(() => {
      db.run(query, function(err) {
        (err) ? console.log(err) : console.log(`Contact has been added.`);
        //if (err) console.log(err);
        //else {
        //  console.log(`Contact has been added.`);
        //  return this.lastID;
        //}
      });
    });
  }

  static update(db, contact) {
    let query = `UPDATE contacts SET name = '${contact.name}', company = '${contact.company}', telp_number = '${contact.phone}', email = '${contact.email}' WHERE id = ${contact.id}`;
    db.serialize ( () => {
      db.run(query, (err) => {
        (err) ? console.log(err) : console.log(`Contact data is updated`);
      });
    });
  }

  static delete(db, id) {
    let query = `DELETE FROM contacts where id = ${id}`;
    let queryAssoc = `DELETE FROM groups_contacts where contact_id = ${id}`;
    db.serialize( () => {
      db.run(query, (err) => {
        (err) ? console.log(err) : console.log(`Contact data has been deleted.`);
      });
      // remove connection in contacts_groups
      db.run(queryAssoc);
    });
  }

  static showContact(db, id) {
    let query = `SELECT contacts.id as id, contacts.name as Name, contacts.telp_number as Phone, contacts.email as Email, contacts.company as Company, groups.name as GroupName FROM contacts LEFT OUTER JOIN groups_contacts ON contacts.id = groups_contacts.contact_id LEFT OUTER JOIN groups ON groups.id = groups_contacts.group_id WHERE contacts.id = ${id}`;
    db.serialize( () => {
      db.all(query, (err, rows) => {
        if (!err) {
          console.log(`ID: ${rows[0].id}\nName: ${rows[0].Name}\nCompany: ${rows[0].Company}\nPhone: ${rows[0].Phone}\nEmail: ${rows[0].Email}\nGroup(s): `);
          for (let i=0; i<rows.length; i++) {
            console.log(rows[i].GroupName);
          }
        } else console.log(err);
      });
    });
  }

  static phoneValidation (phone) {
    (phone.length < 10 || phone.length > 13) ? false : true;
  }

  static emailValidation (email) {
    return /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/g.test(email);
  }

  save() {
    let db = this.connection;
    const checkNameQuery = `SELECT name FROM contacts`;
    if (this.id === null) {
      Contact.create(db,this);
      db.serialize( () => {
        db.all(`SELECT id FROM contacts WHERE name = '${this.name}'`, (err,rows) => {
          if (!err) this.id = rows[rows.length-1].id;
        });
      });
    }
    else {
      Contact.update(db,this);
    }
  }
}

module.exports = Contact;
