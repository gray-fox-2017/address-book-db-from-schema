//Model for contact group, conjunction.
const sqlite3 = require('sqlite3').verbose();
const file = "address_book.db"
const db = new sqlite3.Database(file);
class Contact_Group {
  constructor(components) {
    this.contact_id = components['contact_id'];
    this.group_id = components['group_id'];
  }
  save(){
    var SAVE_CONTACT_GROUP = `INSERT INTO contacts_groups(contact_id,group_id) VALUES ('${this.contact_id}','${this.group_id}');`;
    if (this.contact_id == null || this.group_id == null){
      console.log("Group id and contact id cant be null");
    } else {
      db.parallelize(function(){
        db.run(SAVE_CONTACT_GROUP.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('SAVE_CONTACT_GROUP');
          }
        });
      });
    }
  }

  update_contact_group_by_id(id){
    var UPDATE_CONTACT_GROUP = `UPDATE contacts_groups SET contact_id = '${this.contact_id}',group_id = '${this.group_id}'  WHERE id = '${id}';`;
    if (this.group_id == null|| this.contact_id == null || id === null){
      console.log("Group id, contact id and id cannot be empty");
    } else {
      db.parallelize(function(){
        db.run(UPDATE_CONTACT_GROUP.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('UPDATE_CONTACT_GROUP');
          }
        });
      });
    }
  }

  list_contact_group(){
    var LIST_CONTACT_GROUP = 'SELECT * FROM contacts_groups;'
    db.serialize(function(){
      db.all(LIST_CONTACT_GROUP, function(err, rows){
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

  delete_contact_group_by_id(id){
    var DELETE_CONTACT_GROUP = `DELETE FROM contacts_groups WHERE id = '${id}';`;
    if (id == null){
      console.log("ID must be filled");
    } else {
      db.parallelize(function(){
        db.run(DELETE_CONTACT_GROUP.toString(), function(err){
          if (err){
            console.log(err);
          } else {
            console.log('DELETE_CONTACT_GROUP');
          }
        });
      });
    }
  }

}
// Rilis 1, minus update dan ID; only can be used once
// let test = new Contact_Group({contact_id : 2,group_id :3 });
// console.log(test.group_id);
// test.save();
// test.group_id = "2";
// test.save();
// test.list_contact_group();
// test.delete_contact_group_by_id(1);
