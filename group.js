"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

let file = 'address_book.db'
let db = new sqlite.Database(file)
var Table = require('cli-table2');
var table = new Table({
    head: ['ID', 'NAME']
  //, colWidths: [5, 15, 15, 15, 15]
});


class Group {
  constructor(id, name) {
    this.name = name || ''
    this.id = null
  }
  static save() {
    if (this.id === null) {
      db.serialize(function() {
        let q = `INSERT INTO groups (name) VALUES ('${name}')`
        db.run(q,function(err) {
          if (err) {
            console.log(err);
          } else {
            this.id = this.lastID;
            console.log(`${name} inserted`);
          }
        });
      });
    } else {
      db.serialize(function() {
        db.run(`UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp_number}', email = '${email}' WHERE id = ${id};`, function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log(`id ${id} updated`);
          }
        });
      });
    }
  }

  static create(name) {
        db.serialize(function() {
          let query = `insert into groups (name) VALUES ('${name}')`
          db.run(query, (err) => {
            if (!err) {
              console.log('insert data success');
            } else {
              console.log('failed '+err);
            }
          })
        })
  }

  static read() {
    db.serialize(function() {
      let query = `select * from groups`
      db.all(query, (err,rows) => {
        if (!err) {
          rows.forEach((value) => {
            table.push([value.id,
                        value.name])
          })
          console.log('\n');
          console.log(table.toString());
          table.length = 0
        } else {
          console.log('failed :' +err);
        }
      })
    })
  }

  static update(id, name) {
    db.serialize(function() {
      let query = `update groups
                   set name = '${name}'
                   where id = ${id}`
      db.run(query, (err) => {
        if (!err) {
          console.log('update success');
        } else {
          console.log('failed'+err);
        }
      })
    })
  }

  static delete_data(id) {
    db.serialize(function() {
      let query = `delete from groups where id = ${id}`
      db.run(query, (err) => {
        if (!err) {
          console.log('delete success');
        } else {
          console.log('failed '+err);
        }
      })
    })
  }
}

// let replServer = repl.start({
//   prompt : '>>',
//   input  : process.stdin,
//   output : process.stdout
//
// })
//
// let run = new Group()
//
// replServer.context.create = run.create
// replServer.context.read = run.read
// replServer.context.delete_data = run.delete_data
// replServer.context.update = run.update

export default Group

