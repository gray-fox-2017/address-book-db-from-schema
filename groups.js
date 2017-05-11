//Model for group
const sqlite3 = require('sqlite3').verbose();
const file = "address_book.db"
const db = new sqlite3.Database(file);
class Contact {
  constructor(components) {
    this.group_name = components['group_name'];
  }
  save(){
    var SAVE_GROUP = `INSERT INTO groups(group_name) VALUES ('${this.group_name}');`;
    if (this.group_name == null){
      console.log("Group name cant be null");
    } else {
      db.parallelize(function(){
        db.run(SAVE_GROUP.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('SAVE_GROUP_DATA');
          }
        });
      });
    }
  }

  update_group_by_id(id){
    var UPDATE_GROUP = `UPDATE groups SET group_name = '${this.group_name}' WHERE id = '${id}';`;
    if (this.group_name == null || id === null){
      console.log("Group name and id  cannot be empty");
    } else {
      db.parallelize(function(){
        db.run(UPDATE_GROUP.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('UPDATE_GROUP_DATA');
          }
        });
      });
    }
  }

  list_group(){
    var LIST_GROUP = 'SELECT * FROM groups;'
    db.serialize(function(){
      db.all(LIST_GROUP, function(err, rows){
        if(err){
          console.log("Error List",err);
        } else {
          rows.forEach(function(row) {
            console.log(row);
          })
        }
      })
    })
  }

  delete_group_by_id(id){
    var DELETE_GROUP = `DELETE FROM groups WHERE id = '${id}';`;
    if (id == null){
      console.log("ID must be filled");
    } else {
      db.parallelize(function(){
        db.run(DELETE_GROUP.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('DELETE_GROUP_DATA');
          }
        });
      });
    }
  }

}
// Rilis 1, minus update dan ID; only can be used once
// let test = new Contact({group_name : "Pengajian"});
// console.log(test.group_name);
// test.save()
// test.group_name = "Alumni"
// test.update_group_by_id(3);
// test.save();
// test.list_group();
// test.delete_group_by_id(3);
