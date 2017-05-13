'use strict'

import {Contacts} from "./contact.js";
import {Groups} from "./group.js";
import {Contact_Groups} from "./contact-group.js";
const repl = require('repl');

function help(){
  console.log(`\nMenu`);
  console.log(`\naddData(name,company,telp_number,email)\n updateData(id,name,company,telp_number,email)\n deleteData(id)\nshowData()\n`);
  console.log(`\ninsertGroup(name)\n updateGroup(id,attribute,value)\n deleteGroup(id)\n showGroup()\n`);
  console.log(`\ninsertContactIdToGroup(contact_id, group_id)\n showContactGroup()\n`);
}

let replServer = repl.start('>> ');

replServer.context.addData = Contacts.addData;
replServer.context.updateData = Contacts.updateData;
replServer.context.deleteData = Contacts.deleteData;
replServer.context.showData = Contacts.showData;
replServer.context.insertGroup = Groups.insertGroup;
replServer.context.updateGroup = Groups.updateGroup;
replServer.context.deleteGroup = Groups.deleteGroup;
replServer.context.showGroup = Groups.showGroup;
replServer.context.insertContactIdToGroup = Contact_Groups.insertContactIdToGroup;
replServer.context.showContactGroup = Contact_Groups.showContactGroup;
replServer.context.help = help()  ;
