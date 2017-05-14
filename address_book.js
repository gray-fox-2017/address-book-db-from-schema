"use strict"

const repl = require('repl');
let replserver = repl.start({
  prompt: '\(\~\'\,\'\)\~  ',
  input: process.stdin,
  output: process.stdout
})
const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('daftar-kontak.db');
const Contact = require('./contact.js');
const Kelompok = require('./group.js');
const KontakKelompok = require('./contactGroup.js');

class AddressBook{
  static showAllContact() {
    let query = `SELECT * FROM kontak`;
    db.serialize(function() {
      db.all(query, function(err,row) {
        if (err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }

  static showAllGroup() {
    let query = `SELECT * FROM kelompok`
    db.serialize(function() {
      db.all(query, function(err,row) {
        if (err) {
          console.log(err)
        } else {
          console.log(row)
        }
      })
    })
  }

  static pertolongan() {
    console.log(`                                        Pertolongan                                                   \n`)
    console.log(`------------------------------------------------------------------------------------------------------\n`)
    console.log(`buat_kontak('nama', 'telp', 'kompeni', 'email')  => untuk menambah kontak\n`)
    console.log(`update_kontak(id, 'column', 'value')             => untuk mengupdate value kontak\n`)
    console.log(`delete_kontak(id)                                => untuk menghapus kontak\n`)
    console.log(`show_kontak()                                    => untuk menampilkan seluruh daftar kontak\n`)
    console.log(`buat_group('nama')                               => untuk membuat group baru\n`)
    console.log(`update_group(id, 'nama baru')                    => untuk mengubah nama group\n`)
    console.log(`delete_group(id)                                 => untuk menghapus group\n`)
    console.log(`show_group()                                     => untuk menampilkan seluruh daftar group\n`)
    console.log(`add_kontak_to_group(id kontak, id kelompok)      => untuk menambahkan kontak ke dalam group tertentu\n`)
    console.log(`remove_kontak_from_group(id kontak, id kelompok) => untuk menghapus kontak dari group tertentu\n`)
  }
}
replserver.context.buat_kontak = Contact.addContact;
replserver.context.update_kontak = Contact.UpdateContact;
replserver.context.delete_kontak = Contact.deleteContact;
replserver.context.show_kontak = AddressBook.showAllContact;
replserver.context.buat_group = Kelompok.addGroup;
replserver.context.update_group = Kelompok.updateGroup;
replserver.context.delete_group = Kelompok.deleteGroup;
replserver.context.show_group = AddressBook.showAllGroup;
replserver.context.add_kontak_to_group = KontakKelompok.addKontaktoGroup;
replserver.context.remove_kontak_from_group = KontakKelompok.addKontaktoGroup;
replserver.context.help = AddressBook.pertolongan;