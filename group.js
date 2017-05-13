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
            console.log(`${i+1}.  Nama Group: ${rows[i].name}`)
          }
        }
      }
    });
  })
}

class Group {

  static All(){
    let query = 'select * from groups'
    serializeAll(query)
  }

  static create(name) {
    let query = `INSERT INTO groups (name) VALUES ('${name}')`
    serializeRun(query, 'Data berhasil ditambahkan')
  }

  static update(id, name) {
    let query = `UPDATE groups SET name = '${name}' WHERE id = ${id}`
    serializeRun(query, 'Data berhasil diedit')
  }

  static delete(id){
    let query = `DELETE FROM groups where id = ${id}`
    serializeRun(query, 'Data berhasil dihapus')
  }
}

module.exports = Group;
