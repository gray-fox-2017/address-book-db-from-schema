const Contacts = require('./contact.js')
const Groups = require('./group.js')
const contactsGroups = require('./contact-group.js')

const repl = require('repl')
const replServer = repl.start({
  prompt:'AddressBook>>> ',
  input:process.stdin,
  output:process.stdout
})

const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('data.db')

const fs = require('fs')
const datagroup = JSON.parse(fs.readFileSync('./groupseed.json','utf8'))
const datacontact = JSON.parse(fs.readFileSync('./contactseed.json','utf8'))
const datacontactgroup = JSON.parse(fs.readFileSync('./contactgroupseed.json','utf8'))


function seedContact(){
  for(let i=0;i<datacontact.length;i++){
    let name = datacontact[i].name;
    let company = datacontact[i].company;
    let telp_number = datacontact[i].telp_number;
    let email = datacontact[i].email;
    let query = `INSERT INTO Contacts(name,company,telp_number,email) VALUES('${name}','${company}','${telp_number}','${email}')`
    db.serialize(()=>{
      db.run(query,(err,rows)=>{
        if(!err){
          console.log('seeding kontak berhasil');
        } else {
          console.log(err);
        }
      })
    })
  }
}

function seedGroup(){
  for(let i=0;i<datagroup.length;i++){
    let name = datagroup[i].name;
    let query = `INSERT INTO Groups(name) VALUES('${name}')`
    db.serialize(()=>{
      db.run(query,(err,rows)=>{
        if(!err){
          console.log('seeding grup berhasil');
        } else {
          console.log(err);
        }
      })
    })
  }
}

function seedContactGroup(){
  for(let i=0;i<datacontactgroup.length;i++){
    let contactId = datacontactgroup[i].contact_id;
    let groupId = datacontactgroup[i].group_id;
    let query = `INSERT INTO ContactsGroups(contact_id,group_id) VALUES('${contactId}','${groupId}')`
    db.serialize(()=>{
      db.run(query,(err,rows)=>{
        if(!err){
          console.log('seeding kontak-grup berhasil');
        } else {
          console.log(err);
        }
      })
    })
  }
}

function addContact(obj){
  Contacts.add(db,obj)
}
function showContact(){
  Contacts.show(db)
}

function updateContact(column,new_value,id){
  Contacts.update(db,column,new_value,id)
}
function deleteContact(id) {
  Contacts.deletes(db,id)
}

function addGroup(obj){
  Groups.add(db,obj)
}
function showGroup(){
  Groups.show(db)
}

function updateGroup(new_value,id){
  Groups.update(db,new_value,id)
}
function deleteGroup(id) {
  Groups.deletes(db,id)
}

function showRelation(){
  let query = `SELECT Contacts.name AS 'Contact name', Groups.name AS 'Grad School' FROM Contacts INNER JOIN ContactsGroups ON Contacts.id=ContactsGroups.contact_id INNER JOIN Groups ON ContactsGroups.group_id=Groups.id;`
  //let query = `select * from Contacts`
  db.serialize(()=>{
    db.all(query,(err,rows)=>{
      if(!err){
        console.log(rows);
      }else{
        console.log(err);
      }
    })
  })
}

// let contact = new Contacts({name:'Alex'})
// console.log(contact);


replServer.context.seedContact = seedContact
replServer.context.seedGroup = seedGroup
replServer.context.seedContactGroup = seedContactGroup

replServer.context.addContact = addContact
replServer.context.showContact = showContact
replServer.context.updateContact = updateContact
replServer.context.deleteContact = deleteContact

replServer.context.addGroup = addGroup
replServer.context.showGroup = showGroup
replServer.context.updateGroup = updateGroup
replServer.context.deleteGroup = deleteGroup

