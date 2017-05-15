const regStr = /\w+/gi;
const regEmail = /\w{15}\@\w{3,20}\.\w{2,5}/gi;
const regPhone = /\d+/gi;

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('addressbook.db');


class Contacts {
  constructor(datas) {
    this._id = datas.id || null;
    this._name = datas.name || '';
    this._company = datas.company || '';
    this._email = datas._email || '';
    this._telp_number = datas.telp_number || '';
    this._active = 'A';
    this._update = (this._id === null? 0 : 1);
  }
  get id() { return this._id; }
  get name() { return this._name;}
  get email() { return this._email;}
  get company() { return this._company;}
  get telp_number() {return this._telp_number;}
  set name(name) {this._name = name;}
  set email(email) {this._email = email;}
  set company(company) {this._company = company;}
  set telp_number(phone) {this._telp_number = phone;}
  static callbackContacts(err,contacts){
    console.log('PRINT ALL DATA');
    let id = -1;
    let groupname = [];
    if (!err){
      contacts.forEach((contact) => {
        if (id === contact.id) {
          groupname.push(contact.groupname);
        } else {
          console.log(`ID : ${contact.id}`)
          console.log(`Name: ${contact.name}`);
          console.log(`Company: ${contact.company}`);
          console.log(`Phone: ${contact.telp_number}`);
          console.log(`Email: ${contact.email}`);
          let groups = groupname.join(',').trim();
          console.log('Group : '+ (groups === '' ? '-':groups) );
          console.log('\n');
          groupname = [];
          id = contact.id;
        }
      });
      if (groupname.length > 0) console.log(groupname.join(','));
    } else console.log(err);
  }

  static readAll() {
    let query = `SELECT c.*, coalesce(gg.name,'') as groupname
    FROM contacts AS c
    LEFT JOIN
    (
      SELECT g.name,cg.contact_id
      FROM cgroups AS cg
      JOIN groups AS g ON g.id = cg.group_id
    ) AS gg ON c.id = gg.contact_id
    `;

    db.serialize(()=>{
      db.all(query, (err, rows) => {
        Contacts.callbackContacts(err,rows);
      });
    });
  }
  // save() {
  //   let query = ''
  //   let res = '';
  //   if (this._id === null) {
  //     query = ` INSERT INTO contacts
  //     (name,company,telp_number,email) VALUES
  //     ('${this._name}','${this._company}','${this._telp_number}','${this._email}')`;
  //     res = 'INSERT';
  //   } else {
  //     query = `UPDATE contacts
  //     SET name = '${this._name}', company='${this._company}',
  //     telp_number='${this._telp_number}', email='${this._email}'
  //     WHERE id = ${this.id}`;
  //     res = 'UPDATE';
  //   }
  //   db.serialize(()=>{
  //     db.run(query, function(err) {
  //       if (!err) {
  //         this._id = this.lastID;
  //         res = ` contact number ${this._id}`;
  //       }
  //       else res = `[FAILED] to ${res}`;
  //       console.log(res);
  //     });
  //   });
  // }
  static create(datas) {
    let query = ` INSERT INTO contacts
    (name,company,telp_number,email) VALUES
    ('${datas.name}','${datas.company}','${datas.telp_number}','${datas.email}')`;

    db.serialize(()=>{
      db.run(query, function(err) {
        console.log(err?'[FAILED] to INSERT':`[SUCCEED] to INSERT contact ${this.lastID}`);
      });
    });
  }
  static update(datas) {
    let query = `UPDATE contacts
    SET name = '${datas.name}', company='${datas.company}',
    telp_number='${datas.telp_number}', email='${datas.email}'
    WHERE id = ${datas.id}`;
    db.serialize(()=>{
      db.run(query, function(err) {
        console.log( (err?'[FAILED]':'[SUCCEED]')+' to UPDATE');
      });
    });
  }

  static delete(id) {
    let query = ` DELETE from contacts where id = ${id})`;
    db.run(query, err => {
        console.log((err?'[SUCCEES]':'[FAILED]')+'to DELETE contact');
    });
  }

  // static validateInput(datas) {
  //   let valids = false;
  //
  //   if (datas) {
  //
  //     if (datas.hasOwnProperty('name') && datas.hasOwnProperty('email') && datas.hasOwnProperty('company') && datas.hasOwnProperty('telp_number') && datas.hasOwnProperty('email')) {
  //
  //     }
  //
  //     if () {
  //
  //     }
  //
  //   }
  //
  //
  //   return valids;
  //
  //
  //
  // }


}



// let contact = new Contacts({name:'Sari',telp_number:'0858133727',email:'poppy_mighty@yahoo.com'});
// contact.name = 'Poppy';
// console.log(contact.id);
// contact.save();
// console.log(contact.id);

// Contacts.getAllData((err,contacts)=>{Contacts.callbackContacts(err,contacts)});





module.exports = Contacts;
