"use strict"

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('daftar-kontak.db');

class KontakKelompok{
  static addKontaktoGroup(idKontak, idKelompok) {
    let query = `INSERT INTO kontak_kelompok (kontak_id, kelompok_id) VALUES (${idKontak}, ${idKelompok})`
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) console.log(err)
        else console.log(`kontak ditambahkan ke daftar group!!`);
      })
    })
  }

  static deleteKontakfromGroup(idKontak, idKelompok) {
    let query = `DELETE FROM kontak_kelompok WHERE kontak_id = ${idKontak} AND kelompok_id = ${idKelompok}`;
    db.serialize(function () {
      db.run(query, function (err) {
        if (err) console.log(err)
        else console.log(`kontak dihapus dari daftar group!!`);
      })
    })
  }
}

module.exports=KontakKelompok;