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

replServer.context.contact = contact;
replServer.context.Contact = Contact;
replServer.context.ContactGroup = ContactGroup;
replServer.context.Group = Group;
