//Act as controller, operate from here
const Contacts = require('./contacts.js');
const Groups = require('./groups.js');
const Contacts_Groups = require('./contacts_groups.js');
const repl = require('repl');
const REPLServer = repl.start({prompt : '> '});

let help = () =>{
  console.log("");
}
