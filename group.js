'use strict'

// const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const db =  new sqlite.Database('address_book.db');

class Group{
  constructor(obj){
    this.id = obj.id;
    this.name = obj.name || NULL;
  }

  save(){
    let query = `INSERT INTO groups (name) VALUES ('${this.name}')`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`ADD DATA TO group students SUCCESSFULL!!!`);
        }
      })
    })
  }

  static add(id, name){
    let query = `INSERT INTO groups (name) VALUES ('${name}')`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`ADD DATA TO group students SUCCESSFULL!!!`);
        }
      })
    })
  }

  static update(id, name) {
    let query = `UPDATE groups SET name = '${name}' WHERE id = ${id}`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`UPDATE DATA TO group students SUCCESSFULL!!!`);
        }
      })
    })
  }

  static showAll(){
    let query = `SELECT * FROM groups`;
    db.all(query, (err, rows)=>{
      if(!err)
      console.log(rows);
    })
  }

  static deleteData(id){
    let query_groups = `DELETE FROM groups WHERE id = ${id}`
    let query_group_groups = `DELETE FROM group_contacts WHERE id_group = ${id}`

    db.serialize(()=>{
      db.run(query_groups, (err)=>{
        if(!err){
          console.log(`ID ${id} deleted from groups`);
        }
      })
    })

    db.serialize(()=>{
      db.run(query_group_groups, (err)=>{
        if(!err){
          console.log(`ID GROUP ${id} deleted from group_groups`);
        }
      })
    })
  }
}

// let group = new Group({name : "Manekin"})
//
// group.save()

module.exports  = Group
