const sqlite = require('sqlite3').verbose()
const file = 'address_book.db'
var db = new sqlite.Database(file)

class Contacts {
  constructor() {

  }

  static emailCheck(email){
    let rgx = /\w.*@\w.*./;
    if(!regex.test(email)){
      return false;
    } else {
      return true;
    }
  }

  static phoneNumberCheck(phone_number){
    if(phone_number.length < 10 || phone_number.length > 13){
      return false
    } else {
      return true
    }
  }

  static addContact(name, company, email, phone_number){
    let query = `insert into contacts (name, company, email, phone_number) values (?,?,?,?);`
    if (Contact.emaiCheck(email) && Contact.phoneNumberCheck(phone_number)){
      db.serialize(()=> {
        db.run(query, [name, company, email, phone_number], (err)=> {
          if(!err){
            console.log(`${name}'s contact is saved!`)
          } else {
            console.log(err);
          }
        })
      })
    }
  }

  static showAll(){
    let query = `SELECT contacts.*, groups.name AS group_name FROM contacts LEFT JOIN groups_contacts ON contacts.id = groups_contacts.contact_id LEFT JOIN groups ON groups_contacts.group_id = groups.id;`
    db.each(query, (err, row)=> {
      if(!err){
        console.log(row);
      } else {
        console.log(err);
      }
    })
  }

  static deleteContact(id){
    let query = `DELETE FROM contacts WHERE id = ${id};`
    db.serialize(()=> {
      db.run(query, (err)=> {
        if(!err){
          console.log(`Contact with id : ${id} was deleted`)
        }
      })
    })
  }

  static updateContact(id, fieldName, newValue) {
    let query = `UPDATE contacts SET ${fieldName} = '${newValue}' WHERE id = ${id};`
    if (fieldName == 'email') {
      if (Contact.emailCheck(newValue)){
        db.serialize(()=> {
          db.run(query, [id], (err)=> {
            if(!err){
              console.log(err);
            } else {
              console.log(`Data with id : ${id} was updated`);
            }
          })
        })
      }
    } else if (fieldName == 'phone_number') {
      if (Contact.phoneNumberCheck(newValue)){
        db.serialize(()=> {
          db.run(query, [id], (err)=> {
            if(!err){
              console.log(err);
            } else {
              console.log(`Data with id : ${id} was updated`);
            }
          })
        })
      }
  } else {
    db.serialize(()=> {
      db.run(query, [id], (err)=> {
        if(!err){
          console.log(err);
        } else {
          console.log(`Data with id : ${id} was updated`);
        }
      })
    })
  }
  }

  static help(){
    console.log('Add contact : addContact(name, company, email, phone_number)');
    console.log('update contact : updateContact(id, fieldName, newValue)');
    console.log('delete contact : deleteContact(id)');
    console.log('show all contact : showall()');
    console.log('show contact by filter : showbyfilter(field,valueOf)');
    console.log('add group : addGroup(groupName)');
    console.log('delete group : deletegroup(id)');
    console.log('change group name : changegroupname(id,name)');
    console.log('add conection : addconection(group_id,contact_id)');
    console.log('change conection : changeconection(id,groupid,contactid)');
    console.log('delete conection : deleteconection(id)');
    console.log('help : help()');
  }
}

export default Contacts;
