const sqlite = require('sqlite3').verbose();

var file ='address_book.db'
var db = new sqlite.Database(file)

class Contact {
  constructor(contact) {

    this._id = contact.id||null;
    this.name = contact.name;
    this.company = contact.company;
    this.phone =contact.phone;
    this.email = contact.email;
  }



  save(){

    let contact = this

    let query =`INSERT INTO contacts (name) VALUES ('${this.name}')`;
    db.serialize(function() {

      db.run(query,function(err) {
        contact.id = this.lastID;
        (err ? console.log(err) : console.log(contact.id))
      })
    });
  }
}

let contact = new Contact({name:'alex'})

console.log(contact.id);
contact.save()
console.log(contact.id);
