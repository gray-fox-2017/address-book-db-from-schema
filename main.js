
const repl = require('repl');

const Contact = require('./contact');
const Group_contacts = require('./contact-group');
const Group = require('./group');


let help = () => {
    console.log(`# addGroup('name')`);
    console.log(`# updateGroup('name','id')`);
    console.log(`# deleteGroup('id')`);
    console.log(`# viewGroup()`);

    console.log(`# addContact('name', 'company','phone','email')`);
    console.log(`# updateContact('name', 'company','phone','email','id')`);
    console.log(`# deleteContact('id')`);
    console.log(`# viewAllContact()`);

    console.log(`# addContactIdToGroupId('contacts_id', 'groups_id')`);
    console.log(`# updateGroupContacts('id, contact_id', 'group_id')`);
    console.log(`# showAllGroupContact`);
}

const replServer = repl.start({prompt: '> '})

replServer.context.help = help

//for execute group
replServer.context.addGroup = Group.addGroups
replServer.context.updateGroup = Group.updateGroups
replServer.context.deleteGroup = Group.deleteGroups
replServer.context.viewGroup = Group.viewAllGroup

//for execute contact
replServer.context.addContact = Contact.addContact
replServer.context.updateContact = Contact.updateContacts
replServer.context.deleteContact = Contact.deleteContacts
replServer.context.viewAllContact = Contact.viewAllContact
// replServer.context.test = Contact.test

//for execute contact_group
replServer.context.addContactIdToGroupId = Group_contacts.addgroup_contacts
replServer.context.updateGroupContacts =  Group_contacts.updategroup_contacts
replServer.context.showAllGroupContact =  Group_contacts.showAll
