const Contact = require('./contact.js');
const Group = require('./group.js');
const ContactGroup = require('./contact-group.js');

const repl = require('repl');
const replServer = repl.start({
  prompt: ">> ",
  input: process.stdin,
  output: process.stdout
})

replServer.context.Contact = Contact;
replServer.context.Group = Group;
replServer.context.ContactGroup = ContactGroup;