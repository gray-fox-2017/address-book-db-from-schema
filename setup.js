const repl = require('repl');
const sqlite = require('sqlite3').verbose();
var fs = require('fs');

var file ='address_book.db';
var db = new sqlite.Database(file);

var replServer = repl.start({
  prompt:'$ '
})


let query=[];
    query[0] = "CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL, company VARCHAR(100), phone VARCHAR(20), email VARCHAR(50) );";
    query[1] = "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(100) NOT NULL );";
    query[2] = "CREATE TABLE IF NOT EXISTS contact_groups (id INTEGER PRIMARY KEY AUTOINCREMENT, id_contact INTEGER, id_group INTEGER, FOREIGN KEY(id_contact) references contacts(id), FOREIGN KEY(id_group) references groups(id) );";


let createTable = () => {
  for(let i=0;i<query.length;i++){
    db.serialize(() => {
      db.run(query[i],err => {
        if(err)
        console.log(err)
        else console.log('tables created');
      })
    });
  }
}



let seedContact = () => {

  let fileSeedContact = "contact.json";
  let contactData = fs.readFileSync(fileSeedContact).toString();
  let contactDataJson = JSON.parse(contactData);

  for (let i = 0; i < contactDataJson.length; i++) {
    let seedQuery = `INSERT INTO contacts (name, company, phone, email) VALUES ('${contactDataJson[i].name}', '${contactDataJson[i].company}', '${contactDataJson[i].phone}', '${contactDataJson[i].email}');`

    db.serialize(function () {
      db.run(seedQuery, function (err) {
        if(err)
          console.log(err);
        else console.log(`Inserted Contact ${contactDataJson[i].name}`);
      });
    });
  }
}


let seedGroup = () => {

  let fileSeedGroup = 'group.json';
  let groupData = fs.readFileSync(fileSeedGroup).toString();
  let groupDataJson = JSON.parse(groupData);

  for (let i = 0 ; i < groupDataJson.length; i++) {
    let seedQuery = `INSERT INTO groups (name) VALUES ('${groupDataJson[i].name}');`
    db.serialize(function () {
      db.run(seedQuery, function (err) {
        if(err)
          console.log(err);
        else console.log(`Inserted Group ${groupDataJson[i].name}`);
      });
    });

  }
}


replServer.context.createTable=createTable;
replServer.context.seedContact=seedContact;
replServer.context.seedGroup=seedGroup;
