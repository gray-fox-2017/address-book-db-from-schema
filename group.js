
const sqlite = require('sqlite3').verbose()
const db = new sqlite.Database('address_book.db')

class Group {
  constructor() {

  }

  static show() {
    db.serialize(() => {
      let query = `SELECT * FROM Groups;`
      db.all(query, (err, rows) => {
          console.log(rows);
        })
      })
  }

  static create(name) {
    db.serialize(() => {
      let query = `INSERT INTO Groups (name) VALUES (${name})`
      db.run(query, err => {
        if (err) {console.log(err);return 0;}
        else {console.log(`Group ${name} inserted!`);return 1}
      })
    })
  }

  static update (attribute, value, id) {
    db.serialize(() => {
      let query = `UPDATE Groups SET ${attribute} = ${value} WHERE id = ${id}`
      db.run(query, err => {
        if (err) {console.log(err);return 0}
        else {console.log(`${attribute} updated`);return 1}
      })
    })
  }

  static remove(id) {
    db.serialize(() => {
      let query = `DELETE FROM Groups WHERE id = ${id}`
      db.run(query, err => {
        if (err) {console.log(err);return 0}
        else {console.log(`Group with ${id} has been deleted`);return 1}
      })
    })
  }

  storeDummy() {
    let groups = this.getJsonData()
    groups.forEach((group) => {
      db.serialize(() => {
        let query = `INSERT INTO Groups (name) VALUES ('${group.name}')`
        db.run(query, (err) => {
          if (err) {console.log(err);return 0;}
          else {console.log(`${group.name} inserted to group tables`)};
        })
      })
    })
  }

  deleteDummy() {
    db.serialize(() => {
      let query = `DELETE FROM Groups`
      db.run(query, (err) => {
        if (err) {console.log(err);return 0;}
        else {console.log(`Delete all data from groups table`);}
      })
    })
  }

  getJsonData() {
    let jsonFile = require('jsonfile')
    let jsonData =  jsonFile.readFileSync('groups.json')
    return jsonData;
  }

}



module.exports = Group
