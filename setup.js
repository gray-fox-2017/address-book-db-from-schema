"use strict"
//write your code here
const repl = require('repl');
const sqlite = require('sqlite3').verbose();
let replserver = repl.start({
  prompt: '\(\~\'\,\'\)\~  ',
  input: process.stdin,
  output: process.stdout
})
const fs = require('fs');

var file = 'daftar-kontak.db';
var db = new sqlite.Database(file);

//SQL statement
var create_table_kontak = 'CREATE TABLE IF NOT EXISTS kontak ( id INTEGER PRIMARY KEY AUTOINCREMENT, nama VARCHAR(30), telp VARCHAR(12) UNIQUE, kompeni VARCHAR(30), email VARCHAR(30) UNIQUE)';
var create_table_kelompok = 'CREATE TABLE IF NOT EXISTS kelompok ( id INTEGER PRIMARY KEY AUTOINCREMENT, nama_kelompok VARCHAR(30))';
var create_table_kontak_kelompok = 'CREATE TABLE IF NOT EXISTS kontak_kelompok ( id INTEGER PRIMARY KEY AUTOINCREMENT, kontak_id INTEGER, kelompok_id INTEGER, FOREIGN KEY(kontak_id) REFERENCES kontak(id), FOREIGN KEY(kelompok_id) REFERENCES kelompok(id))'

//CREATE TABLE
let createTableKontak = () => {
  db.serialize(function () {
    db.run(create_table_kontak, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
}

let createTableKelompok = () => {
  db.serialize(function () {
    db.run(create_table_kelompok, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
}

let createTableKontakKelompok = () => {
  db.serialize(function () {
    db.run(create_table_kontak_kelompok, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('CREATE TABLE');
      }
    });
  });
}

//SEED DATA
let seedDataKontak = () => {
  var bacaFileKontak = fs.readFileSync('list-kontak.csv', 'utf-8');
  var kontakperBaris = bacaFileKontak.split('\n');
  var listKontak = kontakperBaris.map(x => x.split(','))
  for (let i=1;i<listKontak.length;i++) {
    db.serialize(function () {
      db.run(`INSERT INTO kontak (nama, telp, kompeni, email) VALUES ('${listKontak[i][0]}', '${listKontak[i][1]}', '${listKontak[i][2]}', '${listKontak[i][3]}');`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT DATA');
        }
      });
    });
  }
}

let seedDataKelompok = () => {
  var bacaFileKelompok = fs.readFileSync('list-kelompok.csv', 'utf-8');
  var listKelompok = bacaFileKelompok.split('\n');
  for (let i=1;i<listKelompok.length;i++) {
    db.serialize(function () {
      db.run(`INSERT INTO kelompok (nama_kelompok) VALUES ('${listKelompok[i]}');`, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('INSERT DATA');
        }
      });
    });
  }
}

let seedDataKontakKelompok = () => {
  var bacaFileKontakKelompok = fs.readFileSync('list_kontak_kelompok.csv', 'utf-8');
  var listKontakKelompok = bacaFileKontakKelompok.split('\n');
  var kontakKelompok = listKontakKelompok.map(x => x.split(','));
  for (let i=1;i<KontakKelompok.length;i++) {
    db.serialize(function () {
      db.run(`INSERT INTO kontak_kelompok (kontak_id, kelompok_id) VALUES ('${kontakKelompok[i][0]}', '${kontakKelompok[i][1]}')`, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log('tambah kontak kelompok')
        }
      })
    })
  }
}

replserver.context.buat_kontak = createTableKontak;
replserver.context.buat_kelompok = createTableKelompok;
replserver.context.buat_kontak_kelompok = createTableKontakKelompok;
replserver.context.tambah_kontak = seedDataKontak;
replserver.context.tambah_kelompok = seedDataKelompok;
replserver.context.tambah_kontak_kelompok = seedDataKontakKelompok;