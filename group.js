class Groups{
  constructor(obj){
    this.name = obj.name;
  }
  static add(db,obj){
    let query = `INSERT into Groups (name) VALUES ('${obj.name}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Data added');
        }
      })
    })
  }

  static show(db){
    let query = `Select * from Groups`
    db.serialize(()=>{
      db.all(query, function(err,rows){
        if(err){
          console.log(err);
        } else {
          console.log(`Table groups list:\n`);
          rows.forEach((row)=>{
            console.log(`\n${row.id} | ${row.name}`);
          })
        }
      })
    })
  }

  static update(db,new_value,id){
    let query = `Update Groups set name = '${new_value}' where id = '${id}'`
    db.serialize(()=>{
      db.run(query, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(`Group ${id} Updated!`);
        }
      })
    })
  }

  static delete(db,id){
    let query = `Delete from Groups where id = '${id}'`
    db.serialize(()=>{
      db.run(query,(err)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(`Group ${id} Deleted!`);
        }
      })
    })
  }

}

module.exports = Groups