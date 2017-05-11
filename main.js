import Contact from './contact.js'
import Group from './group.js'
import ContactGroup from './contact-group.js'

const repl = require('repl')
const replServer = repl.start('> ')

replServer.context.contact = Contact
replServer.context.group = Group
replServer.context.contactgroup = ContactGroup
