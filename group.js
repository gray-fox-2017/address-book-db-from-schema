const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db')
// const repl = require('repl')
// const replServer = repl.start('> ')

class Group{
  constructor(components){
    this.id = components.id || null
    this.name = components.name
  }
  
  static add(name){
    let query = `INSERT into groups (name) VALUES ('${name}')`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(`${name} Added!`);
      }
    })
  }
  
  static deleteGroup(id){
    let query = `Delete from groups where id = '${id}'`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
      rows.forEach((data)=>{
        console.log(`${data.name} Deleted!`);
      })  
      }
    })
  }
  
  static update(name,new_name,id){
    let query = `Update groups set '${name}' = '${new_name}' where id = '${id}'`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
          console.log(`${data.name} Deleted!`);
        })
      }
    })
  }
  
  static show(){
    let query = `Select * from groups`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        console.log(`Table groups list:\n`);
        rows.forEach((data)=>{
          console.log(`\n${data.id} | ${data.name}`);
        })
      }
    })
  }
  
  save() {
    let id=this.id,
    name=this.name,
    obj = this;
    if(this.id===null){
      db.serialize(function(){
        db.run(`INSERT INTO groups (name) VALUES ('${name}');`,function(err){
          if(err){
            console.log(err.message)
          } else {
            obj.id = this.lastID;
            console.log(`ID:${obj.id} Name:${name} inserted`)
            
          }
        })
      })
    } else {
      db.serialize(function(){
        db.run(`UPDATE groups SET name = '${name}' WHERE id = ${id};`, function(err){
          if(err){
            console.log(err.message)
          } else {
            console.log(`id ${id} updated`)
          }
        })
      })
    }
  }
    
}

export default Group