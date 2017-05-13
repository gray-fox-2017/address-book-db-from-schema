'use strict'

// const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const db =  new sqlite.Database('address_book.db');

class Contact{
  constructor(obj){
    this.id = obj.id || NULL;
    this.name = obj.name || NULL;
    this.company  = obj.company;
    this.telp_number = obj.telp_number;
    this.email = obj.email;
  }

  save(){
    let regex = /^\w+@\w+.[a-z]{3}$|^\w+@\w+.[a-z]{2}.[a-z]{2}$/gi
    if (regex.test(this.email) == false) {
      console.log(`Please input correct email format!!`);
    } else if (typeof +this.telp_number == 'number' && this.telp_number.length < 17 && this.telp_number.length > 8 && this.id == NULL) {
      let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${this.name}', '${this.company}', '${this.telp_number}', '${this.email}')`;
      db.serialize(()=>{
        db.run(query, (err)=>{
          if(!err){
            console.log(`ADD DATA TO students SUCCESSFULL!!!`);
          }
        })
      })
      return true;
    } else {
      console.log(`Please insert correct telpon number format !!!`);
      return false;
    }
  }

  static add(id, name, company, telp_number, email){
    let regex = / ^\w+@\w+.[a-z]{3}$ | ^\w+@[a-z]{5}.[a-z]{2}.[a-z]{2}$/gi
    if (regex.test(this.email) == false) {
      console.log(`Please input correct email format!!`);
    } else if (typeof +telp_number == 'number' && telp_number.length < 17 && telp_number.length > 8) {
      let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${name}', '${company}', '${telp_number}', '${email}')`;
      db.serialize(()=>{
        db.run(query, (err)=>{
          if(!err){
            console.log(`ADD DATA TO students SUCCESSFULL!!!`);
          }
        })
      })
      return true;
    } else {
      console.log(`Please insert correct telpon number format !!!`);
      return false;
    }
  }

  static update(id, name, company, telp_number, email) {
    let regex = / ^\w+@\w+.[a-z]{3}$ /gi
    if (regex.test(email) == false) {
      console.log(`Please input correct email format!!`);
    } else if (typeof +telp_number == 'number' && telp_number.length < 17 && telp_number.length > 8) {
      let query = `UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp_number}', email ='${email}' WHERE id = ${id}`;
      db.serialize(()=>{
        db.run(query, (err)=>{
          if(!err){
            console.log(`UPDATE DATA TO students SUCCESSFULL!!!`);
          }
        })
      })
      return true;
    } else {
      console.log(`Please insert correct telpon number format !!!`);
      return false;
    }
  }

  static showAll(){
    let query = `SELECT * FROM contacts`;
    db.all(query, (err, rows)=>{
      if(!err)
      console.log(rows);
    })
  }

  static deleteData(id){
    let query_contacts = `DELETE FROM contacts WHERE id = ${id}`
    let query_group_contacts = `DELETE FROM group_contacts WHERE id_contact = ${id}`

    db.serialize(()=>{
      db.run(query_contacts, (err)=>{
        if(!err){
          console.log(`ID ${id} deleted from contacts`);
        }
      })
    })

    db.serialize(()=>{
      db.run(query_group_contacts, (err)=>{
        if(!err){
          console.log(`ID ${id} deleted from group_contacts`);
        }
      })
    })
  }
}

// let contact = new Contact({name : "Cindy", company: "pantai indah", telp_number: "0215678997", email:"cindy@yahoo.co.id"})
//
// contact.save()

module.exports  = Contact
