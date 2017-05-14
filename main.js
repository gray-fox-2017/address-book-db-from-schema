'use strict'

const Contact = require('./contact.js');
const Group = require('./group.js')
const ContactGroup = require('./contact-group.js')

const repl = require('repl');
let replServer = repl.start({
  prompt: '>> ',
  input: process.stdin,
  output: process.stdout
});

var contact = new Contact({name: 'Helo'})

function help(){
  console.log(`---------------------------------------------------------------------------------`);
  console.log(`                                  Help List                                      `);
  console.log(`---------------------------------------------------------------------------------`);
  console.log(`Type:`);
  console.log(`   Contact.add(name, company, telp_number, email)      Add new contact to record`);
  console.log(`   Contact.update(id, attribute, value)                Update contact based on ID`);
  console.log(`   Contact.delete(id)                                  Delete contact based on ID`);
  console.log(`   Contact.All()                                       Show all contact`);
  console.log(`   Group.add(name)                                     Add new group to record`);
  console.log(`   Group.update(id, name)                              Update group based on ID`);
  console.log(`   Group.delete(id)                                    Delete group based on ID`);
  console.log(`   Group.All()                                         Show all group`);
  console.log(`   ContactGroup.add(contact_id, group_id)              Add new contact-group to record`);
  console.log(`   ContactGroup.update(id, attr, value)                Update contact-group based on ID`);
  console.log(`   ContactGroup.delete(id)                             Delete contact-group based on ID`);
  console.log(`   ContactGroup.All()                                  Show all contact-group`);
  console.log(`   help()                                              Show all help list`);
}

replServer.context.contact = contact;
replServer.context.Contact = Contact;
replServer.context.ContactGroup = ContactGroup;
replServer.context.Group = Group;
replServer.context.help = help;
