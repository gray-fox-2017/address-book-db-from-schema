const regStr = /\w+/gi;
const regEmail = /\w{15}\@\w{3,20}\.\w{2,5}/gi;
const regPhone = /\d+/gi;

const sqlite = require('sqlite3').verbose();
let db = new sqlite.Database('addressbook.db');

let CGroups = class CGroups {
  constructor() {

  }
  static callbackCGroups(err,cgroups){
    console.log('PRINT ALL DATA cgroups');
    if (!err){
      cgroups.forEach((cgroup) => {
          console.log(`ID : ${cgroup.id}`)
          console.log(`CName: ${cgroup.cname}`);
          console.log(`CGroup: ${cgroup.gname}`);
      });
    } else console.log(err);
  }

  static readAll() {
    let query = `SELECT cg.id,c.name as cname,g.name as gname
    FROM cgroups AS cg
    JOIN groups AS g on cg.group_id = g.id
    JOIN contacts AS c on c.id = cg.contact_id
    `;

    db.serialize(()=>{
      db.all(query, (err, rows) => {
        CGroups.callbackCGroups(err,rows);
      });
    });
  }

  static readByID(id) {
    let query = `SELECT cg.id,c.name as cname,g.name as gname
    FROM cgroups AS cg
    JOIN groups AS g on cg.group_id = g.id
    JOIN contacts AS c on c.id = cg.contact_id
    WHERE cg.id = ${id}
    `;

    db.serialize(()=>{
      db.all(query, (err, rows) => {
        CGroups.callbackCGroups(err,rows);
      });
    });
  }

  static create(datas) {
    let query = ` INSERT INTO cgroups
    (contact_id, group_id) VALUES
    ('${datas.contact_id}','${datas.group_id}')`;

    db.serialize(()=>{
      db.run(query, function(err) {
        console.log(err?'[FAILED] to INSERT':`[SUCCEED] to INSERT cgroup ${this.lastID}`);
      });
    });
  }
  static update(datas) {
    let query = `UPDATE cgroups
    SET contact_id = '${datas.contact_id}',
    group_id = '${datas.group_id}'
    WHERE id = ${datas.id}`;
    db.serialize(()=>{
      db.run(query, function(err) {
        console.log( (err?'[FAILED]':'[SUCCEED]')+' to UPDATE');
      });
    });
  }

  static deletes(id) {
    console.log(id)
    let query = ` DELETE from cgroups where id = ${id}`;
    db.run(query, (err) => {
        console.log((!err?'[SUCCEES]':'[FAILED]')+'to DELETE cgroups');
    });
  }
}

module.exports = CGroups;