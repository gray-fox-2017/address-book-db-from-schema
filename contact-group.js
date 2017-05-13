
let sqlite = require('sqlite3').verbose()
let db = new sqlite.Database('address_book.db')

// let repl = require('repl')
// let replServer = repl.start('>> ')

class ContactGroup {
  constructor() {

  }

  assign(contact_id, group_id) {
    let query = `INSERT INTO Contacts_Groups (contact_id, group_id) VALUES (${contact_id}, ${group_id})`
    db.serialize(() => {
      db.run(query, err => {
        if (err) {console.log(err);return 0}
        else (console.log(`${contact_id} joined group id ${group_id}`))
      })
    })
  }
}

// let cg = new ContactGroup()
// replServer.context.cg = cg

module.exports = ContactGroup;
