'use strict'
const {createTable,seedTable} = require('./setup.js');
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
const file = 'student.db';
let db = new sqlite.Database(file);
let replServer = repl.start();
let datas = {
  {group: [] },
  {cgroup: [] },
  {contact:[]}
};
//stsrc


replServer.context.createTable = createTable;
replServer.context.seedTable = seedTable;