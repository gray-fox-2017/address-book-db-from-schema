'use strict'
const repl = require('repl');
let replServer = repl.start();
// const {Contact,Group,CGroup} = require('./models');
const Contacts = require('./models/contact.js');
const Groups = require('./models/group.js');
const CGroups = require('./models/contact-group.js');
class Controller {
  constructor() {
    // this._groups = new Groups();
    // this._contacts =;
    // this._cgroups = [];
    this._viewAddress = new ViewAddress();
    // this.init();
  }

  start() {

  }
  help() {
    this._viewAddress.help();
  }

  // static callbackContacts(err,contacts){
  //   let id = 1;
  //   let groupname = [];
  //   if (!err){
  //     contacts.forEach((contact) => {
  //       if (id === contact.id) {
  //         console.log(`Name: ${contact.name}`);
  //         console.log(`Company: ${contact.company}`);
  //         console.log(`Phone: ${contact.telp_number}`);
  //         console.log(`Email: ${contact.email}`);
  //         groupname.push(contact.groupname);
  //       } else {
  //         console.log('Group : '+groupname.join(','));
  //         groupname = [];
  //         id = contact.id;
  //       }
  //     });
  //     if (groupname.length > 0) console.log(groupname.join(','));
  //   } else console.log(err);
  // }
  // init() {
  //   Contacts.getAllData((err,contacts)=>{callbackContacts});
  // }





}


class ViewAddress {
  constructor() {}
  help() {
    console.log('=====================================HELP======================================');
    console.log('Welcome to AddressBook');
    console.log('Lakukan inisiasi awal untuk memulai : ');
    console.log('let contact = new Contact()')
    console.log('a. Tuliskan nama tabel yang ingin dipakai diawalan perintah [Contact|Group|CGroup]');

    console.log('  1. <create> untuk memasukan data, co: Group.create({name:"Anti Mage"})');
    console.log('  2. <update> untuk mengubah data, co: Group.update({name:"Archer",id:1})');
    console.log('  3. <deletes> untuk menghapus data, co: Group.deletes(1)'); //nanti urus masalah pk fk
    console.log('  4. <save> untuk menyimpan perubahan, co: Group.save()');
    console.log('  5. <readAll> untuk melihat data, co: Group.readAll()');
    console.log('  6. <readByID> untuk melihat data berdasarkan id, co: Group.readByID(1)');
    console.log('b. <help> untuk menampilkan Help, co: ab.help()');
    console.log('===============================================================================');

  }
}

replServer.context.ab = new Controller();
replServer.context.Contact = Contacts;
replServer.context.Group = Groups;
replServer.context.CGroup = CGroups;

