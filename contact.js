"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

let replServer = repl.start('>> ');

class Contacts {

    addData(name,company,telp_number,email){
      let addData = `INSERT INTO contacts(name,company,telp_number,email)
                 VALUES('${name}','${company}','${telp_number}','${email}');`;
      db.serialize(function(){
        db.run(addData, function(err){
          if (err) {
            console.log(err);
          }else {
            console.log(addData);
          }
        });
      });
    }

    updateData(id,name,company,telp_number,email){
      let updateData = `UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp_number}', email = '${email}'
                        WHERE contacts.id = '${id}';`;
      db.serialize(function(){
        db.run(updateData, function(err){
          if (err) {
            console.log(err);
          }else {
            console.log(updateData);
          }
        });
      });
    }

    deleteData(id){
      let deleteData = `DELETE FROM contacts WHERE contacts.id = '${id}'`;
      db.serialize(function(){
        db.run(deleteData,function(err){
          if (err) {
            console.log(err);
          }else {
            console.log(deleteData);
          }
        });
      });
    }

    showData(){
      let showData = `SELECT * FROM contacts`;
      db.serialize(function(){
        db.all(showData, function(err,row){
          if (err) {
            console.log(err);
          }else {
            console.log(showData);
          }
        });
      });
    }

    help(){
      let help = `addData(name,company,telp_number,email)\n updateData(id,name,company,telp_number,email)\n deleteData(id)\n showData()`;
      console.log(help);
    }

}
