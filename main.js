const repl = require('repl');

const Contact = require('./contact')
const Contact_Group = require('./contact-group')
const Group = require('./group')


let help = () =>{
  console.log(`
  +++++++++ RULES OF OPERATION +++++++++
  - contact
  - group
  - contact_group
  WITH CRUD FUNCTION
  1. add
     attributess for contact (name, company, telp_number, email)
     attributess for group(name)
     attributess for contact_group(id_contact, id_group)
  2. update
     attributess for contact (id, name, company, telp_number, email)
     attributess for group(id, name)
     attributess for contact_group(id, id_contact, id_group)
  3. showAll
  4. deleteData(id)`);
}


const replServer = repl.start({prompt : ">>"})

replServer.context.help = help();

//for excecute groups
// replServer.context.insertGroup = Group.addGroup
// replServer.context.insertGroup = Group.addGroup
// replServer.context.insertGroup = Group.addGroup
// replServer.context.insertGroup = Group.addGroup

//for excecute contact

replServer.context.contact = Contact
replServer.context.group = Group
replServer.context.contact_group = Contact_Group
// replServer.context.add = Contact.add
// replServer.context.update = Contact.update
// replServer.context.showAll = Contact.showAllContact
// replServer.context.deleteData = Contact.deleteData

//for excecute group_contacts
// replServer.context.insertGroup = Group.addGroup
