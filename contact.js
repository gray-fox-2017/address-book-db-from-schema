'use strict'

const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('daftar-kontak.db');

class Contact{
  constructor() {}

  static addContact(nama, telp, kompeni, email) {
    let query = `INSERT INTO kontak (nama, telp, kompeni, email) VALUES ('${nama}', '${telp}', '${kompeni}', '${email}')`;
    db.serialize(function() {
      db.run(query, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log(`${nama} berhasil ditambahkan ke dalam contact!!`);
        }
      })
    })
  }

  static deleteContact(id) {
    let query = `DELETE FROM kontak WHERE id = ${id}`;
    db.serialize(function () {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Kontak terhapus!!');
        }
      })
    })
    let query2 = `DELETE FROM kontak_kelompok WHERE kontak_id = ${id}`
    db.serialize(function () {
      db.run(query2, function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Kontak terhapus dari daftar group!!')
        }
      })
    })
  }

  static updateContact(id, column, value) {
    let query = `UPDATE kontak ${column} = '${value}' WHERE id = ${id}`;
    db.serialize(function () {
      db.run(query, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log('Kontak terupdate!')
        }
      })
    })
  }
}

module.exports= Contact;