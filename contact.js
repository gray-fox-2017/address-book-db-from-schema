class Contacts{
  constructor(obj){
    this.name = obj.name;
    this.company = obj.company;
    this.telp_number = obj.telp_number;
    this.email = obj.email;
  }

  save(db){
    let query = `INSERT into Contacts (name,company,telp_number,email) VALUES ('${this.name}','${this.company}','${this.telp_number}','${this.email}')`
    db.serialize(()=>{
      db.run(query, (err)=>{
        if (err) {
          console.log(err);
        } else {
          console.log('Data added');
        }
      })
    })
  }

  static add(db,obj){
    let pattern = /.+@\w+\.[a-zA-Z0-9.]+/
    let pattern2 = /^\d+$/
    let query = `INSERT into Contacts (name,company,telp_number,email) VALUES ('${obj.name}','${obj.company}','${obj.telp_number}','${obj.email}')`
    if(pattern.test(obj.email) == false){
      console.log('email yg anda masukkan salah');
    } else {
      if(pattern2.test(obj.telp_number) == true){
        if(obj.telp_number.length < 14 && obj.telp_number.length > 9){
          db.serialize(()=>{
            db.run(query, (err)=>{
              if (err) {
                console.log(err);
              } else {
                console.log('Data added');
              }
            })
          })
        } else {
          console.log('telp yg anda masukkan harus 10-13 karakter');
        }
      } else {
        console.log('telp yg anda masukkan hanya boleh berisi angka');
      }
    }
  }

  static show(db){
    let query = `Select * from Contacts`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      } else {
        console.log(`Table contacts list:\n`);
        rows.forEach((row)=>{
          console.log(`\n${row.id} | ${row.name} | ${row.company} | ${row.telp_number} | ${row.email}`);
        })
      }
    })
  }

  static update(db,column,new_value,id){
    let query = `Update Contacts set ${column} = '${new_value}' where id = '${id}'`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(`Contact ${id} Updated!`);
      }
    })
  }

  static deletes(db,id){
    let query = `Delete from Contacts where id = '${id}'`
    db.serialize(()=>{
      db.run(query,(err)=>{
        if(err){
          console.log(err);
        }
        else{
          console.log(`Contact ${id} Deleted!`);
        }
      })
    })
  }

}

module.exports = Contacts

