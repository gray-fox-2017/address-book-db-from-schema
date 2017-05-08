"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

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
        console.log('tidak ada daftar');
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
    this._name = option.name
    this._id = null
    this._company = null
    this._telp_number = null
    this._email = null
  }

  get name(){
    return this._name
  }

  set name(option){
    this._name = option.name
    return this._name
  }

  get id(){
    return this._id
  }

  save(){
    let query = `INSERT INTO contacts (name) VALUES ('${this._name}')`
    serializeRun(query, 'Data berhasil ditambahkan.')
  }

  getAllData(){
    let query = 'select * from contacts'
    serializeAll(query)
  }
}

var contact = new Contact({name: 'Alex'})
// contact.id
// contact.save()
// contact.id
replServer.context.getAllData = contact.getAllData;
// console.log(contact.id)
