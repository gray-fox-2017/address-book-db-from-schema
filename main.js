'use strict'

import {Contacts} from "./contact.js"
const repl = require('repl');


let replServer = repl.start('>> ');

replServer.context.addData = Contacts.addData;
replServer.context.updateData = Contacts.updateData;
replServer.context.deleteData = Contacts.deleteData;
replServer.context.showData = Contacts.showData;
replServer.context.insertGroup = Groups.insertGroup;
replServer.context.updateGroup = Groups.updateGroup;
replServer.context.deleteGroup = Groups.deleteGroup;
replServer.context.showGroup = Groups.showGroup;
replServer.context.insertConjunction = Contact_Groups.insertContactIdToGroup;
replServer.context.showConjunction = Contact_Groups.showContactGroup;