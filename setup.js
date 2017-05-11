const sqlite3 = require('sqlite3').verbose();
const db =  new sqlite3.Database('address_.db');
const repl = require('repl')
const fs = require('fs')
const replServer = repl.start('> ')

let contatcsData = JSON.parse(fs.readfileSync('contatcs.json').toString())
let groupsData = JSON.parse(fs.readfileSync('groups.json').toString())
let contactgroupData = JSON.parse(fs.readfileSync('contact-groups.json').toString())

let CREATE_TABLE_CONTACTS = `Create table if not exists contacts (id integer primary key autoincrement,name varchar, company varchar, phone varchar, email varchar)`
let CREATE_TABLE_GROUPS = `Create table if not exists groups (id integer primary key autoincrement, name varchar)`
let CREATE_TABLE_CONTACTGROUP = `Create table if not exists contactgroup (id integer primary key autoincrement,contact_id integer,group_id integer, foreign key(contact_id) references contacts(id), foreign key (group_id) references groups(id))`

let createTableContact = () =>{
  db.serialize(function(){
      db.run(CREATE_TABLE_CONTACTS, function(err){
        if(err){
          console.log(err)
        }
        else{
          console.log('\nCreate Table contacts Success!');
        }
      })
    })
  }
  
let createTableGroup = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE_GROUPS, function(err){
      if(err){
        console.log(err)
      }
      else{
        console.log(`Create Table groups Success`);
      }
    })
  })
} 

let createTableContactGroup = () => {
  db.serialize(function(){
    db.run(CREATE_TABLE_CONTACTGROUP, function(err){
      if(err){
        console.log(err);      
      }
      else {
        console.log(`Create Table contactgroup Success!`);
      }
    })
  })
}

let seedContacts = () => {
  for(let i = 0; i < contactsData.length;i++){
    let query = `INSERT into contacts (name,company,phone,email) Values ('${contactsData[i].name}','${contactsData[i].company}','${contactsData[i].phone}','${contactsData[i].email})'`
    db.serialize(function (){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(`Contacts Seeds successfully added!`);
        }
      })
    })
  }
}

let seedGroups = () => {
  for(let i = 0; i < groupsData.length; i++){
    let query = `INSERT into groups (name) Values ('${groupsData[i].name}')`
    db.serialize(function (){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(`Groups Seeds successfully added!`);
        }
      })
    })
  }
}

let seedContactGroup = () => {
  for(let i = 0; i < contactgroupData.length); i++){
    let query = `INSERT into (contact_id,group_id) Values ('${contactgroupData[i].contact_id}','${contactgroupData[i].group_id}')`
    db.serialize(function (){
      db.run(query, function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log(`Contact-Groups Seeds successfully added!`);
        }
      })
      })
    }
  }

replServer.context.createtablecontact = createTableContact()  
replServer.context.createtablegroup = createTableGroup() 
replServer.context.createtablecontactgroup = createTableContactGroup()  