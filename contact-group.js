const sqlite = require('sqlite3').verbose();
const db =  new sqlite.Database('address_book.db');

class ContactGroup{
  constructor(obj){
    this.id_contact = obj.id_contact || NULL;
    this.id_group = obj.id_group || NULL;
  }

  save(){
    let query = `INSERT INTO group_contacts (id_contact, id_group) VALUES ('${this.id_contact}', '${this.id_group}')`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`ADD DATA TO group_contacts SUCCESSFULL!!!`);
        }
      })
    })
  }

  static add(id, id_contact, id_group){
    let query = `INSERT INTO group_contacts (id_contact, id_group) VALUES (${id_contact}, ${id_group})`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`ADD DATA TO group_contacts SUCCESSFULL!!!`);
        }
      })
    })
  }

  static update(id, id_group, id_contact) {
    let query = `UPDATE group_contacts SET id_contact = ${id_contact}, id_group = ${id_group} WHERE id = ${id}`;
    db.serialize(()=>{
      db.run(query, (err)=>{
        if(!err){
          console.log(`UPDATE DATA TO group_contacts SUCCESSFULL!!!`);
        }
      })
    })
  }

  static showAll(){
    let query = `SELECT * FROM group_contacts`;
    db.all(query, (err, rows)=>{
      if(!err)
      console.log(rows);
    })
  }

  static deleteData(id){
    let query_group_contacts = `DELETE FROM group_contacts WHERE id = ${id}`

    db.serialize(()=>{
      db.run(query_group_contacts, (err)=>{
        if(!err){
          console.log(`ID ${id} deleted from group_contacts`);
        }
      })
    })
  }
}

// let group_contacts = new ContactGroup ({id_contact : 1, id_group : 2})
//
// group_contacts.save()

module.exports  = ContactGroup
