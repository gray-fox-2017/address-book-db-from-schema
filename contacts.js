//Model for contact
const sqlite3 = require('sqlite3').verbose();
const file = "address_book.db"
const db = new sqlite3.Database(file);
class Contact {
  constructor(components) {
    this.firstname = components['firstname'];
    this.lastname = components['lastname'];
    this.phone = components['phone'];
    this.email = components['email'];
  }
  save(){
    var SAVE_CONTACT = `INSERT INTO contacts(firstname,lastname,phone,email) VALUES ('${this.firstname}', '${this.lastname}', '${this.phone}', '${this.email}');`;
    if (this.firstname == null || this.phone == null){
      console.log("First name and phone cannot be empty");
    } else {
      db.parallelize(function(){
        db.run(SAVE_CONTACT.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('SAVE_CONTACT_DATA');
          }
        });
      });
    }
  }

  update_firstname_by_id(id){
    var UPDATE_CONTACT = `UPDATE contacts SET firstname = '${this.firstname}' WHERE id = '${id}';`;
    if (this.firstname == null || this.phone == null || id === null){
      console.log("First name, id and phone cannot be empty");
    } else {
      db.parallelize(function(){
        db.run(UPDATE_CONTACT.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('UPDATE_CONTACT_DATA');
          }
        });
      });
    }
  }

  list_contact(){
    var LIST_CONTACT = 'SELECT * FROM contacts;'
    db.serialize(function(){
      db.all(LIST_CONTACT, function(err, rows){
        if(err){
          console.log("Error List",err);
        } else {
          rows.forEach(function(row) {
            console.log(row);
          })
        }
      })
    })
  }

  delete_contact_by_id(id){
    var DELETE_CONTACT = `DELETE FROM contacts WHERE id = '${id}';`;
    if (id == null){
      console.log("ID must be filled");
    } else {
      db.parallelize(function(){
        db.run(DELETE_CONTACT.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('DELETE_CONTACT_DATA');
          }
        });
      });
    }
  }

  list_join(){
    var LIST_JOIN = `SELECT contacts.firstname, contacts.phone, groups.group_name FROM contacts,contacts_groups ON contacts.id = contacts_groups.contact_id ,groups ON contacts_groups.group_id = groups.id ;`;
    db.serialize(function(){
      db.all(LIST_JOIN, function(err, rows){
        if(err){
          console.log("Error List",err);
        } else {
          rows.forEach(function(row) {
            console.log(row);
          })
        }
      })
    })
  }

}
// Rilis 1, minus update dan ID; only can be used once
let test = new Contact({firstname : "Bambang", phone : "081234907"})
// console.log(test.firstname);
test.save();
// test.firstname = "Mulyadi";
// test.update_firstname_by_id(4);
// test.save();
// test.list_contact()
// test.delete_contact_by_id(4);
test.list_join()
