const sqlite = require('sqlite3').verbose();
const repl = require('repl');
var file ='address_book.db'
var db = new sqlite.Database(file)


//-------------
//CONTACTS-----
//-------------
let createContact=(contact) => {
  db.serialize(() => {

    let phone_length = contact.phone.split('').length;

    if(validationPhone(contact.phone) && phone_length<=13 && phone_length>=10){
      if(validationEmail(contact.email)){
          let query=`INSERT INTO contacts (name,company,phone,email) values ('${contact.name}','${contact.company}','${contact.phone}','${contact.email}')`
          db.run(query,(err) => {
            (err ? console.log(err):console.log(`data has been created`))
          });
        }
      else console.log('Email invalid');
    }else console.log('Phone invalid');


  });
}

let showContact = () => {
  db.serialize(() => {
    let query=`select c.id,c.name,c.company,c.phone,c.email,g.name as gruop_name from contacts c join contact_groups cg on c.id=cg.id_contact join groups g on cg.id_group=g.id`
    db.all(query,(err,rows)=>{
        (err ? console.log(err):console.log(rows))
    })
  })
}

let updateContact = (column,value,id) => {
  db.serialize(() => {
    let query = `update contacts set ${column}='${value}' where id=${id}`
    db.run(query,err => {
      (err ? console.log(err):console.log('data has been updated'));
    });
  });
}

let deleteContact = (id) => {
  db.serialize(() => {
    let query = `delete from contacts where id=${id}`
    db.run(query,er => {
      (err ? console.log(err):console.log(`data has been deleted`))
    });
  });
}


//-------------
//GROUPS-------
//-------------

let createGroup=(name) => {
  db.serialize(() => {
    let query=`INSERT INTO groups (name) values ('${name}')`
    db.run(query,(err) => {
      (err ? console.log(err):console.log(`data has been created`))
    });
  });
}

let showGroup = () => {
  db.serialize(() => {
    let query=`select * from groups`
    db.all(query,(err,rows)=>{
        (err ? console.log(err):console.log(rows))
    })
  })
}

let updateGroup = (name,id) => {
  db.serialize(() => {
    let query = `update groups set name='${name}' where id=${id}`
    db.run(query,err => {
      (err ? console.log(err):console.log('data has been updated'));
    });
  });
}

let deleteGroup = (id) => {
  db.serialize(() => {
    let query = `delete from groups where id=${id}`
    db.run(query,err => {
      (err ? console.log(err): db.serialize(() => {
        let query2 = `delete from contact_groups where id_group=${id}`
        db.run(query2,err => {
          (err ? console.log(err): console.log('Data has been deleted'))
        })
      }))
    });
  });
}

let assign = (nameContact,nameGroup) => {
  db.serialize(() => {
    let query = `insert into contact_groups (id_contact,id_group) values((select id from contacts where name='${nameContact}'),(select id from groups where name='${nameGroup}'))`
    db.run(query,err => {
      (err? console.log(err):console.log('Data has been Inserted'));
    });
  });
}


let validationPhone=(phone) => {
  let regex =/^\d+$/g
  return (regex.test(phone))?true:false

}

let validationEmail = (email) => {
  let regex=/.+@.+\..+/g
  return (regex.test(email)) ? true:false

}




var replServer = repl.start({
  prompt:'$ '
})

//CONTACTS
replServer.context.createContact = createContact;
replServer.context.showContact = showContact;
replServer.context.updateContact = updateContact;
replServer.context.deleteContact = deleteContact;

//GROUPS
replServer.context.createGroup = createGroup;
replServer.context.showGroup = showGroup;
replServer.context.updateGroup = updateGroup;
replServer.context.deleteGroup = deleteGroup;

//assign
replServer.context.assign = assign;
