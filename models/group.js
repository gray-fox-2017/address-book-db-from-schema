const regStr = /\w+/gi;
const regEmail = /\w{15}\@\w{3,20}\.\w{2,5}/gi;
const regPhone = /\d+/gi;

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('addressbook.db');

let Groups = class Groups {
  constructor() {

  }
  static callbackGroups(err,groups){
    console.log('PRINT ALL DATA GROUPS');
    let id = -1;
    let contactname = [];
    if (!err){
      groups.forEach((group) => {
        if (id === group.id) {
          contactname.push(group.contactname);
        } else {
          console.log(`ID : ${group.id}`)
          console.log(`Name: ${group.name}`);
          let groups = contactname.join(',').trim();
          console.log('Contacts : '+ (groups === '' ? '-':groups) );
          console.log('\n');
          contactname = [];
          id = group.id;
        }
      });
      if (contactname.length > 0) console.log(contactname.join(','));
    } else console.log(err);
  }

  static readAll() {
    let query = `SELECT c.name,c.id, coalesce(gg.name,'') as contactname
    FROM groups AS c
    LEFT JOIN
    (
      SELECT g.name,cg.group_id
      FROM cgroups AS cg
      JOIN contacts AS g ON g.id = cg.contact_id
    ) AS gg ON c.id = gg.group_id
    `;

    db.serialize(()=>{
      db.all(query, (err, rows) => {
        Groups.callbackGroups(err,rows);
      });
    });
  }

  static readByID(id) {
    let query = `SELECT c.name,c.id, coalesce(gg.name,'') as contactname
    FROM groups AS c
    LEFT JOIN
    (
      SELECT g.name,cg.group_id
      FROM cgroups AS cg
      JOIN contacts AS g ON g.id = cg.contact_id
    ) AS gg ON c.id = gg.group_id
    WHERE c.id = ${id}
    `;

    db.serialize(()=>{
      db.all(query, (err, rows) => {
        Groups.callbackGroups(err,rows);
      });
    });
  }

  static create(datas) {
    let query = ` INSERT INTO groups
    (name) VALUES
    ('${datas.name}')`;

    db.serialize(()=>{
      db.run(query, function(err) {
        console.log(err?'[FAILED] to INSERT':`[SUCCEED] to INSERT group ${this.lastID}`);
      });
    });
  }
  static update(datas) {
    let query = `UPDATE groups
    SET name = '${datas.name}'
    WHERE id = ${datas.id}`;
    db.serialize(()=>{
      db.run(query, function(err) {
        console.log( (err?'[FAILED]':'[SUCCEED]')+' to UPDATE');
      });
    });
  }

  static deletes(id) {
    console.log(id)
    let query = ` DELETE from groups where id = ${id}`;
    db.run(query, (err) => {
        console.log((!err?'[SUCCEES]':'[FAILED]')+'to DELETE groups');
    });
  }
}
module.exports = Groups;
