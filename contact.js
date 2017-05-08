

class Contact {
// CREATE TABLE Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100),company VARCHAR(100), phone_number VARCHAR(100), email VARCHAR(100));
// CREATE TABLE Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100));
// CREATE TABLE Contacts_Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER, group_id INTEGER);

  constructor(jsonFile) {
    this.file = jsonFile;
    this.id = "";
    this.name = "";
  }

  getDummy() {
    let contacts = this.getJsonData()
    for (let i = 0; i < contacts.length; i++) {
      db.serialize(function () {
        let contact = contacts[i]
        let query = `INSERT INTO Contacts (name, company, phone_number, email) VALUES ('${contact.id}', '${contact.company}', '${contact.phone_number}', '${contact.email}');`;
        db.run(query, function (err) {
          if (err) {
            console.log(err);
            return 0;
          } else {
            console.log('Contact table created');
            return 1;
          }
        });
      });
    }
  }

  getJsonData() {
    let jsonFile = require('jsonfile')
    let jsonData =  jsonFile.readFileSync(this.file)
    return jsonData;
  }

  jsonToDb(obj) {
    this.id = obj['id']
    this.name = obj['name']
    this.phone_number = obj['phone_number']
    this.email = obj['email']
  }

  static getAllData (callback) {
    db.serialize(function () {
      let query = "SELECT * FROM Contacts"
      db.all(query, function (error, rows) {
        callback(rows)
      })
    })
  }

  static getEmailAddress (callback) {
    db.serialize(function () {
      let query = "SELECT email FROM Contacts"
      db.all(query, function (error, rows) {
        callback(rows)
      })
    })
  }

}

let contact = new Contact('contacts.json')

const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('address_book.db')

contact.getDummy()
Contact.getAllData(function (dataUsers) {
  console.log(dataUsers);
})

//
// Contact.getAllData(function(dataUsers) {
//   Contact.getEmailAddress(function(addressUsers) {
//     console.log("Email address : ");
//     console.log(addressUsers);
//     console.log("------------------");
//     console.log("Get all data : ");
//     console.log(dataUsers);
//   })
// })
