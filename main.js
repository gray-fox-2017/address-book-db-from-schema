"use strict";

const Setup = require("./setup.js");
const Seed = require("./seed.js");
const Contact = require("./contact.js");
const Group = require("./group.js");
const GC = require("./group_contact.js");

const sqlite = require('sqlite3').verbose();
const repl = require('repl');

let replServer = repl.start({
  prompt: `~ `,
  input: process.stdin,
  output: process.stdout
});

const help = () => {

};

let db = new sqlite.Database('address_book.db');

replServer.context.db = db;
replServer.context.Setup = new Setup;
replServer.context.Seed = new Seed;
replServer.context.Contact = Contact;
replServer.context.Group = Group;
replServer.context.GC = GC;

