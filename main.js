"use strict";

const Setup = require("./setup.js");
const Seed = require("./seed.js");
const Contact = require("./contact.js");
const Group = require("./group.js");
const GC = require("./group_contact.js");

const sqlite = require('sqlite3').verbose();
const repl = require('repl');

let replServer = repl.start({
  prompt: `~ `,
  input: process.stdin,
  output: process.stdout
});

const help = () => {
  console.log(`DOCUMENTATION\n
*** SETUP ***\n
Setup.createTables -> initialize the tables;\n
*** SEED ***\n
Seed.contacts -> Seed the contacts\n
Seed.groups -> Seed the groups\n
Seed.groups_contacts -> Seed the relations between groups and contacts\n
*** CONTACT ***\n
new Contact({name:'name',company:'company',phone:'12345678910',email:'name@company.com'}) -> Create new contact object\n
new Contact({contact object}).save() -> to insert a contact record into the database, if id === null, otherwise it will update the contact record\n
Contact.create(database, {contact object}) -> insert a contact record into the database\n
Contact.update(database, {contact object with id !== null}) -> update a contact record in the database\n
Contact.delete(database, id) -> delete a contact record in the database\n
Contact.show(database, id) -> show a contact record based on the id\n
*** GROUP ***\n
new Group({name:'name'}) -> Create new group object\n
new Group({group object}).save() -> to insert a group record into the database, if id === null, otherwise it will update the group record\n
Group.create(database, {group object}) -> insert a group record into the database\n
Group.update(database, {group object with id !== null}) -> update a group record in the database\n
Group.delete(database, id) -> delete a group record in the database\n
Group.show(database, id) -> show a group record based on the id\n
*** Association ***
GC.assign(database, new GC({group_id: groupId, contact_id: contactId})) -> to assign a contact to a group or vice versa.\n
`)};

let db = new sqlite.Database('address_book.db');

replServer.context.db = db;
replServer.context.Setup = new Setup;
replServer.context.Seed = new Seed;
replServer.context.Contact = Contact;
replServer.context.Group = Group;
replServer.context.GC = GC;
replServer.context.help = help;
