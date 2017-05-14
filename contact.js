"use strict"

const repl = require('repl')
const sqlite = require('sqlite3').verbose()

let file = 'address_book.db'
let db = new sqlite.Database(file)
var Table = require('cli-table2');
var table = new Table({
    head: ['ID', 'NAME', 'COMPANY', 'TELP NUMBER', 'EMAIL']
  //, colWidths: [5, 15, 15, 15, 15]
});

var table2 = new Table({
    head: ['ID', 'NAME', 'COMPANY', 'TELP NUMBER', 'EMAIL', 'ID GROUP','GROUP NAME', 'GROUP CONTACT ID']
  //, colWidths: [5, 15, 15, 15, 15]
});
 
class Contact {
  constructor() {

  }
  save() {
    let id = this.id;
    name = this.name,
    company = this.company,
    telp_number = this.telp_number,
    email = this.email,
    obj = this;

    if (id === null) {
      db.serialize(function() {
        db.run(`INSERT INTO contacts (name, company, telp_number, email) VALUES ('${name}', '${company}', '${telp_number}', '${email}');`,function(err) {
          if (err) {
            console.log(err);
          } else {
            obj.id = this.lastID;
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

  create(name, company, telp_number, email) {
    if(Contact.emailValidate(email)) {
      if (Contact.telp_numberValidate(telp_number)) {
        db.serialize(function() {
          let query = `insert into contacts (name, company, telp_number, email) VALUES
          ('${name}', '${company}', '${telp_number}', '${email}')`
          db.run(query, (err) => {
            if (!err) {
              console.log('insert data success');
            } else {
              console.log('failed '+err);
            }
          })
        })
      } else {
        console.log('phone is not valid');
      }
    } else {
      console.log('email is not valid');
    }
  }

  read() {
    db.serialize(function() {
      let query = `select * from contacts`
      db.all(query, (err,rows) => {
        if (!err) {
          rows.forEach((value) => {
            table.push([value.id,
                        value.name,
                        value.company,
                        value.telp_number,
                        value.email])
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

  update(id, name, company, telp_number, email) {
    db.serialize(function() {
      let query = `update contacts
                   set name = '${name}', company = '${company}',
                   telp_number = '${telp_number}', email = '${email}'
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

  delete_data(id) {
    db.serialize(function() {
      let query = `delete from contacts where id = ${id}`
      db.run(query, (err) => {
        if (!err) {
          console.log('delete success');
        } else {
          console.log('failed '+err);
        }
      })
    })
  }

  static emailValidate(email) {
    let rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g
    return rgx.test(email)
  }

  static telp_numberValidate(telp_number) {
    if(telp_number.length >= 10 && telp_number.length <= 15) {
      return true
    }
  }

  show() {

    /*
    * SELECT Orders.OrderID,
            Customers.CustomerName,
            Shippers.ShipperName
FROM ((Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID)
INNER JOIN Shippers ON Orders.ShipperID = Shippers.ShipperID);
    */
    let query = `SELECT
                contacts.id as contacts_id,
                contacts.name as contacts_name,
                contacts.telp_number,
                contacts.email,
                groups.id as groups_id,
                groups.name,
                groups_contacts.id as groups_contacts_id
                FROM ((contacts
                LEFT JOIN groups ON contacts.id= groups.id)
                LEFT JOIN groups_contacts ON contacts.id = groups_contacts.id)`
    db.all(query ,function(err, data) {
        if (err) {
          console.log(err);
        } else {
          data.forEach((value) =>
          table2.push([value.contact_id,
                       value.contact_name,
                       value.company,
                       value.telp_number,
                       value.email,
                       value.group_id,
                       value.group_name,
                       value.groups_contacts_id]));
          console.log("\n");
          console.log(table2.toString());
          table2.length = 0;
        }
      });
    }


}

let replServer = repl.start({
  prompt : '>>',
  input  : process.stdin,
  output : process.stdout

})

let run = new Contact()

replServer.context.create = run.create
replServer.context.read = run.read
replServer.context.delete_data = run.delete_data
replServer.context.update = run.update
replServer.context.show = run.show

export default Contact
