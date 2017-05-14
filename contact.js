"use strict"

const sqlite = require('sqlite3').verbose();
var file= 'contacts.db';
var db= new sqlite.Database(file);

function serializeRun(query, message){
  db.serialize(function() {
    db.run(query, function(err){
      if (err) {
        console.log(err);
      } else {
        console.log(message)
      }
    });
  });
}
function serializeAll(query){
  db.serialize(function(){
    db.all(query, function(err, rows){
      if (err) {
        console.log(err);
      } else {
        if(rows.length == 0){
          console.log(null);
        } else{
          for(let i=0; i<rows.length; i++){
            console.log('\n');
            console.log(`${i+1}.  Nama: ${rows[i].name}`)
            console.log(`    ID: ${rows[i].id}`)
            console.log(`    Company: ${rows[i].company}`)
            console.log(`    Phone: ${rows[i].telp_number}`)
            console.log(`    Email: ${rows[i].email}\n`)
          }
        }
      }
    });
  })
}

class Contact {
  constructor(option){
    this.originName = option.name
    this.name = option.name
  }

  save(){
    if(this.originName == this.name){
      let query = `INSERT INTO contacts (name) VALUES ('${this.name}')`
      serializeRun(query, 'Data berhasil ditambahkan')
    } else {
      let query = `UPDATE contacts SET name = '${this.name}' where id = '${this.id}'`
      serializeRun(query, 'Data berhasil diedit')
    }
  }

  get id(){
    let query = `select * from contacts where name = '${this.name}'`
    db.serialize(function(){
      db.all(query, function(err, rows){
        if (err) {
          console.log(err);
        } else {
          if(rows.length == 0){
            console.log(null);
            return null
          } else{
            console.log(`ID: ${rows[0].id}`)
          }
        }
      });
    })
  }

  static All(){
    let query = `SELECT
      contacts.id as contact_id,
      contacts.name as contact_name,
      contacts.company,
      contacts.telp_number,
      contacts.email,
      groups.id as group_id,
      groups.name as group_name
      FROM contacts LEFT JOIN groups_contacts ON (contacts.id = groups_contacts.contact_id) LEFT JOIN groups ON (groups_contacts.group_id = groups.id) `
    db.serialize(function(){
      db.all(query, function(err, rows){
        if (err) {
          console.log(err);
        } else {
          if(rows.length == 0){
            console.log(null);
          } else{
            // console.log(rows);
            for(let i=0; i<rows.length; i++){
              console.log('\n');
              console.log(`${i+1}.  Contact ID: ${rows[i].contact_id}`)
              console.log(`    Name: ${rows[i].contact_name}`)
              console.log(`    Company: ${rows[i].company}`)
              console.log(`    Phone: ${rows[i].telp_number}`)
              console.log(`    Email: ${rows[i].email}`)
              console.log(`    Group ID: ${rows[i].group_id}`)
              console.log(`    Group Name: ${rows[i].group_name}`)
            }
          }
        }
      });
    })
  }

  static add(name, company, telp_number, email) {
    let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${name}', '${company}', '${telp_number}', '${email}')`
    if (Contact.phoneValid(telp_number)){
      if(Contact.emailValid(email)){
        serializeRun(query, 'Data berhasil ditambahkan')
      } else {console.log('Email is not valid')}
    } else {console.log('Phone is not valid')}
  }

  static update(id, attr, value) {
    let query = `UPDATE contacts SET ${attr} = '${value}' WHERE id = ${id}`
    if (attr == 'email' && Contact.emailValid(value)) {
      serializeRun(query, 'Data email berhasil diedit')
    }
    else if (attr == 'telp_number' && Contact.phoneValid(value)) {
      serializeRun(query, 'Data Telepon Number berhasil diedit')
    }
    else if (attr == 'telp_number' || attr == 'email'){
      if (!Contact.emailValid(value) && attr=='email') {
        console.log('Email tidak valid');
      } else {
        console.log('Telepon tidak valid');
      }
    } else {
      serializeRun(query, 'Data berhasil diedit')
    }

  }

  static delete(id){
    let query = `DELETE FROM contacts where id = ${id}`
    serializeRun(query, 'Data berhasil dihapus')
  }

  static phoneValid(phone){
    let phoneNum = /\d{8,13}/
    return phoneNum.test(phone)
  }

  static emailValid(email){
    let emailAddress = /\w{3,30}.\w{3,30}\@\w{3,20}\.\w{2,10}/
    return emailAddress.test(email)
  }
}


module.exports = Contact;
