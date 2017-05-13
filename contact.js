"use strict"

const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('address_book.db')

class Contact {

  constructor() {}

  static show () {
    db.serialize(function () {
      let query =
      `SELECT Contacts.name as name ,Groups.name as group_name, Contacts.phone_number, Contacts.email FROM Contacts_Groups ` +
      `left outer JOIN Contacts ON Contacts_Groups.contact_id = Contacts.id ` +
      `left outer JOIN Groups ON Contacts_Groups.group_id = Groups.id;`;
      db.all(query, function (err, contacts) {
        if (err) {console.log(err);return 0}
        else {
          contacts.forEach(contact => {
            console.log(`name : ${contact.name}`);
            console.log(`group : ${contact.group_name}`);
            console.log(`phone : ${contact.phone_number}`);
            console.log(`email : ${contact.email}`);
            console.log('\n');
          });
          return 1;
        }
      })
    })
  }

  static create (name, phone_number=null, email=null){
    if (Contact.validateName(name) && Contact.validatePhone(phone_number) && Contact.validateEmail(email)) {
      db.serialize(() => {
        let query = `INSERT INTO Contacts (name, phone_number, email) ` +
        `VALUES ('${name}', '${phone_number}', '${email}')`
        db.run(query, (err) => {
          if (err) {console.log(err);return 0;}
          else console.log(`${name} added`);
        })
      })
    }
  }

  static remove(id) {
    db.serialize(() => {
      let query = `DELETE FROM Contacts WHERE id = ${id}`
      db.run(query, (err) => {
        if (err) {console.log(err);return 0}
        else {console.log(`id ${id} Deleted`);return 1}
      })
    })
  }

  static update(attribute, value, id) {
      let query = '';
      if (typeof attribute != 'string') {
        query = `UPDATE Contacts SET ${attribute} = ${value} WHERE id = ${id}`
      } else {
        query = `UPDATE Contacts SET ${attribute} = '${value}' WHERE id = ${id}`
      }

      db.serialize (function () {
        db.run(query, (err) => {
          if (err) {console.log(err);return false;}
          else {console.log(`id ${id} in Table contacts updated`);return true;}
        })
      })
  }


  static validateName (name) {
    let regx = /\w/g
    if (regx.test(name) && name.length <= 20) {
      return true;
    } else{
      console.log("Validate error ,name must less than 20 character");
      return false;
    };
  }

  static validatePhone(phone) {
    let regx = /\d{3}-\d{3}-\d{3}/
    if (regx.test(phone) && phone.length <= 14 || phone === null) {
      return true;
    } else {
      console.log("phone number must be written xxx-xxx-xxx and less than 14 number");
      return false;
    }
  }

  static validateEmail(email) {
    let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regx.test(email) || email === null) {
      return true
    } else {
      console.log("Email validation error");
      return false;
    }
  }

  seed() {
    let jsonFile = require('jsonfile')
    let contacts = jsonFile.readFileSync('contacts.json')
    for (let i = 0; i < contacts.length; i++) {
      db.serialize(function () {
        let contact = contacts[i]
        let query = `INSERT INTO Contacts (name, phone_number, email) VALUES ('${contact.name}', '${contact.phone_number}', '${contact.email}');`;
        db.run(query, function (err) {
          if (err) {
            console.log(err);
            return 0;
          } else {
            console.log(`${contact.name} inserted to Contacts Tables`);
            return 1;
          }
        });
      });
    }
  }

  undoSeed () {
    let query = `DELETE FROM Contacts`
    db.serialize(() => {
      db.run(query, (err) => {
        if (err) {
          console.log(err);
          return 0
        } else {
          console.log("Deleted all data");
          return 1
        }
      })
    })
  }

}

// console.log(Contact.getJsonData());

module.exports = Contact;
