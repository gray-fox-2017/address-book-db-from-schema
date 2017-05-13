"use strict"

let Contact = require('./contact.js')
let Group = require('./group.js')
let contact_group = require('./contact-group.js')
let repl = require('repl')
let replServer = repl.start(">> ")

let contact = new Contact()
let cg = new contact_group()

replServer.context.help = help
replServer.context.seed = contact.seed
replServer.context.Contact = Contact
replServer.context.Group = Group
replServer.context.assign = cg.assign

function help() {
  console.log(`==================HELP MENU======================`);
  console.log(`help() >> show help`);
  console.log(`Contact.show() >> show all relation`);
  console.log(`Contact.create([name],[phone],[email])`);
  console.log(`Contact.update([attribute],[value],[id])`);
  console.log(`Contact.remove([id])`);
  console.log(`                                                  `);
  console.log(`Group.show() >> show Groups`);
  console.log(`Group.remove([id]) >> delete group by id`);
  console.log(`Group.update([attribute],[value],[id])`);
  console.log(`Group.create([name])`);
  console.log(`                                                   `);
  console.log(`assign([contact_id], [group_id]) >> assign contact to group`);
  console.log(`contact.seed() >> seed dummy data `);
  return "";
}
