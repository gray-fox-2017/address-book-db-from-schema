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
            console.log(`${i+1}.  ID Contact: ${rows[i].contact_id}`)
            console.log(`    ID Group: ${rows[i].group_id} \n`)
          }
        }
      }
    });
  })
}

class ContactGroup {

  static All(){
    let query = 'select * from groups_contacts'
    serializeAll(query)
  }

  static add(contact_id, group_id) {
    let query = `INSERT INTO groups_contacts (contact_id, group_id) VALUES (${contact_id}, ${group_id})`
    serializeRun(query, 'Data berhasil ditambahkan')
  }

  static update(id, attr, value) {
    let query = `UPDATE groups_contacts SET ${attr} = ${value} WHERE id = ${id}`
    serializeRun(query, 'Data berhasil diedit')
  }

  static delete(id){
    let query = `DELETE FROM groups_contacts where id = ${id}`
    serializeRun(query, 'Data berhasil dihapus')
  }
}


module.exports = ContactGroup;
