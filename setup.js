const sqlite = require('sqlite3')
const db = new sqlite.Database('data.db')

let CREATE_TABLE = [
  `CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL, company VARCHAR, telp_number VARCHAR, email VARCHAR)`,
  `CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR NOT NULL)`,
  `CREATE TABLE IF NOT EXISTS ContactsGroups (id INTEGER PRIMARY KEY AUTOINCREMENT, contact_id INTEGER NOT NULL, group_id INTEGER NOT NULL)`
]

function createTable(){
  db.serialize(()=>{
    for(let i=0;i<CREATE_TABLE.length;i++){
      db.run(CREATE_TABLE[i],(err)=>{
        if(!err){
          console.log('table created');
        } else {
          console.log(err);
        }
      })
    }
  })
}

createTable()