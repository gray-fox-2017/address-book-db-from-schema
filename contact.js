"use strict"

const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let file = 'address_book.db';
let db = new sqlite.Database(file);

// let replServer = repl.start('>> ');

 export class Contacts {

    static addData(name,company,telp_number,email){
      let regexPhone = /^\d{10,13}$/;
      // let regexEmail = ;
      if(regexPhone.test(telp_number) === false){
        console.log("Incorrect phone. Please input numbers between 10-13 length.");
      }else {
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
    }

    static updateData(id,name,company,telp_number,email){
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

    static deleteData(id){
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

    static showData(){
      let showData = `SELECT contacts.*, groups.name as nama_groups from contacts left join contact_groups on contacts.id = contact_groups.contact_id
                      left join groups on groups.id = contact_groups.group_id`;
      db.serialize(function(){
        db.all(showData, function(err,rows){
          if (err) {
            console.log(err);
          }else {
            console.log('jasckjcbdjb');
            console.log(rows);
          }
        });
      });
    }

    static help(){
      let help = `addData(name,company,telp_number,email)\n updateData(id,name,company,telp_number,email)\n deleteData(id)\n showData()`;
      console.log(help);
    }

}

// replServer.context.addData = Contacts.addData;
// replServer.context.updateData = Contacts.updateData;
// replServer.context.deleteData = Contacts.deleteData;
// replServer.context.showData = Contacts.showData;
// replServer.context.help = Contacts.help;
