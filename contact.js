"use strict"
// const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let file = './address_book.db';
let db = new sqlite.Database(file);

class Contact {
  constructor(object) {
    this.id = object.id || null;
    this.name = object.name;
    this.company = object.company;
    this.phone = object.phone;
    this.email = object.email;
  }

  save() {
    let obj = this;
    let query;
    if(this.id !== null) {
      query = `UPDATE contact SET name = '${this.name}', company = '${this.company}', phone = '${this.phone}', email = '${this.email}' WHERE id = ${id};`;
    } else {
      query = `INSERT INTO contact(name, company, phone, email) VALUES ('${this.name}', '${this.company}', '${this.phone}', '${this.email}');`
    }
    db.serialize(function() {
      db.run(query, function (err, result){
        if(err) {
          console.log(err)
        } else {
          obj.id = this.lastID;
          console.log(`ID ${obj.id} has been inserted`)
        }
      })
    })
  }

  static add(object) {
    let name = object.name || null;
    let company = object.company || null;
    let phone = object.phone || null;
    let email = object.email || null;
    if(Contact.emailValidation(email) || email == null) {
      if(Contact.phoneValidation(phone) || phone == null) {
        let query = `INSERT INTO contact(name, company, phone, email) VALUES ('${name}', '${company}', '${phone}', '${email}');`
        db.serialize(function() {
          db.run(query, function (err, result){
            if(err) {
              console.log(err)
            } else {
              console.log(`${name} has been inserted`)
            }
          })
        })
      } else console.log('Phone needs to be between 10-17 digits');
    } else console.log('Email is not in correct format');
  }

  static showAll() {
    let query = `SELECT * FROM contact`;
    db.serialize(function() {
      db.all(query, (err, rows) => {
        if(err) console.log(err);
        console.log('ID | Name | Company | Phone | Email');
        rows.forEach(row => {
          console.log(`${row.id} | ${row.name} | ${row.company} | ${row.phone} | ${row.email}`)
        })
      })
    })
  }

  static showGroup() {
    let query = `SELECT contact.*, contact_group.groups_id AS group_id FROM contact JOIN contact_group ON contact_group.contact_id = contact.id WHERE contact_group.contact_id = contact.id ORDER BY contact_id`;
    db.serialize(function() {
      db.all(query, (err, rows) => {
        if(err) console.log(err);
        console.log('ID | Name | Company | Phone | Email | Group ID');
        rows.forEach(row => {
          console.log(`${row.id} | ${row.name} | ${row.company} | ${row.phone} | ${row.email} | ${row.group_id}`)
        })
      })
    })
  }

  static update(attr, val, id) {
    let query = `UPDATE contact SET '${attr}' = '${val}' WHERE id = ${id}`;
    db.serialize(function() {
      db.run(query, function (err, result){
        if(err) {
          console.log(err)
        } else {
          console.log(`ID ${id} has been updated`)
        }
      })
    })
  }

  static remove(id) {
    let query = `DELETE FROM contact WHERE id = ${id}`;
    db.serialize(function() {
      db.run(query, (err) => {
        if(err) console.log(err);
      })
    })
  }

  static emailValidation(email) {
    let reg = /[^\s@]+@[^\s@]+\.[^\s@]+/
    if(reg.test(email)) {
      return true;
    } else return false;
  }

  static phoneValidation(phone) {
    if(phone.length < 10 || phone.length > 17) {
      return false;
    } else return true;
  }
}

let contact = new Contact({name: "Alex"})

// contact.save()

// Contact.showAll()
// Contact.showGroup()

// Contact.add({name: 'Budi', company: 'TU Delft', phone: '08372897821', email: 'budi@bud.'})

module.exports = Contact;