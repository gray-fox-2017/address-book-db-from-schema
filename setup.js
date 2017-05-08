
var createTableContact =
"CREATE TABLE IF NOT EXISTS Contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, "+
"name VARCHAR(100)," +
"company VARCHAR(100), phone_number VARCHAR(100), email VARCHAR(100));";

var createTableGroup =
"CREATE TABLE IF NOT EXISTS Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, "+
"name VARCHAR(100));";

var createTableConjungtion =
"CREATE TABLE IF NOT EXISTS Contacts_Groups (id INTEGER PRIMARY KEY AUTOINCREMENT, "+
"contact_id INTEGER, group_id INTEGER);";

var seedContact = "INSERT INTO Contacts (name, company, phone_number, email) VALUES ('Fajar', 'Kebon Sirih Inc', '089-89781800', 'fajar@gmail.com');";
var seedGroup = "INSERT INTO Groups (name) VALUES ('Kebon Sirih Inc');";

const repl = require('repl');
const sqlite = require('sqlite3').verbose();

var db = new sqlite.Database('address_book.db');

var replServer = repl.start({
  input: process.stdin,
  output: process.stdout,
  prompt: ">> "
})

replServer.context.create = create
replServer.context.insert = insert
replServer.context.read_contacts = readContacts
replServer.context.read_groups = readGroups
replServer.context.read_groups_contacts = readContactsGroup


function create() {
  db.serialize(createAll);
}

function insert() {
  db.serialize(insertAll)
}

function read() {
  readContacts()
  readGroups()
  readContactsGroup()
}

function readContacts() {
  db.serialize(function () {
    var readData = "SELECT * FROM Contacts"
    db.all(readData, function (err, rows) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log(rows);
        return 1;
      }
    })
  })
}

function readGroups() {
  db.serialize(function () {
    var readData = "SELECT * FROM Groups"
    db.all(readData, function (err, rows) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log(rows);
        return 1;
      }
    })
  })
}

function readContactsGroup() {
  db.serialize(function () {
    var readData = "SELECT * FROM Contacts_Groups"
    db.all(readData, function (err, rows) {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log(rows);
        return 1;
      }
    })
  })
}

// Create and Insert
function createAll() {
  createContacts();
  createGroup();
  createGroupContact();
}

function insertAll() {
  insertContact();
  insertGroup();
}

function insertContact() {
  db.run(seedContact, function (err) {
    if (err) {
      console.log(err);
      return 0;
    } else {
      console.log('Contact table created');
      return 1;
    }
  });
}

function insertGroup() {
  db.run(seedGroup, function (err) {
    if (err) {
      console.log(err);
      return 0;
    } else {
      console.log('Grups table inserted');
      return 1;
    }
  });
}

function createContacts() {
  db.run(createTableContact, function (err) {
    if (err) {
      console.log(err);
      return 0;
    } else {
      console.log('Contact table created');
      return 1;
    }
  });
}

function createGroup() {
  db.run(createTableGroup, function (err) {
    if (err) {
      console.log(err);
      return 0;
    } else {
      console.log('Group table Created');
      return 1;
    }
  });
}

function createGroupContact() {
  db.run(createTableConjungtion, function (err) {
    if (err) {
      console.log(err);
      return 0;
    } else {
      console.log('Group Contact Table created');
      return 1;
    }
  });
}
