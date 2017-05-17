"use strict"

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('daftar-kontak.db');

class Kelompok{
  constructor() {}

  static addGroup(nama) {
    let query = `INSERT INTO kelompok (nama_kelompok) VALUES ('${nama}')`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) console.log(err)
        else console.log(`${nama} ditambahkan ke daftar group!!`);
      })
    })
  }

  static deleteGroup(id) {
    let query = `DELETE FROM kelompok WHERE id = ${id}; DELETE FROM kontak_kelompok WHERE kelompok_id = ${id}`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) console.log(err)
        else console.log(`Group dan relasinya telah terhapus!!`);
      })
    })
  }

  static updateGroup(id, namaBaru) {
    let query = `UPDATE kelompok nama_kelompok = '${namaBaru}' WHERE id = ${id}`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) console.log(err)
        else console.log(`Group terupdate!!`);
      })
    })
  }

  static liatGroup() {
    let query = `SELECT * FROM kelompok`;
    db.serialize(function () {
      db.all(query, function (err,row) {
        if (err) console.log(err)
        else console.log(row);
      })
    })
  }
}

module.exports=Kelompok;