class ContactsGroups{
  constructor(obj){
    this.contact_id = obj.contact_id;
    this.group_id = obj.group_id;
  }
  static add(db,obj){
    let query = `INSERT into ContactsGroups (contact_id,group_id) VALUES ('${obj.contact_id}','${obj.group_id}')`
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
    let query = `Select * from ContactsGroups`
    db.serialize(()=>{
      db.all(query, function(err,rows){
        if(err){
          console.log(err);
        } else {
          console.log(`Table ContactsGroups list:\n`);
          rows.forEach((row)=>{
            console.log(`\n${row.contact_id} | ${row.group_id}`);
          })
        }
      })
    })
  }

  static update(db,column,new_value,id){
    let query = `Update ContactsGroups set '${column}' = '${new_value}' where id = '${id}'`
    db.serialize(()=>{
      db.run(query, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(`ContactsGroups ${id} Updated!`);
        }
      })
    })
  }

  static delete(db,id){
    let query = `Delete from ContactsGroups where id = '${id}'`
    db.serialize(()=>{
      db.run(query,(err)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(`ContactsGroups ${id} Deleted!`);
        }
      })
    })
  }

}

module.exports = ContactsGroups