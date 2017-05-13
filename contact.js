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
    let query = 'select * from contacts'
    serializeAll(query)
  }

  static create(name, company, telp_number, email) {
    let query = `INSERT INTO contacts (name, company, telp_number, email) VALUES ('${name}', '${company}', '${telp_number}', '${email}')`
    serializeRun(query, 'Data berhasil ditambahkan')
  }

  static update(id, attr, value) {
    let query = `UPDATE contacts SET ${attr} = '${value}' WHERE id = ${id}`
    serializeRun(query, 'Data berhasil diedit')
  }

  static delete(id){
    let query = `DELETE FROM contacts where id = ${id}`
    serializeRun(query, 'Data berhasil dihapus')
  }
}


module.exports = Contact;
