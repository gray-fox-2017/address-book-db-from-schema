const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('address_book.db')
// const repl = require('repl')
// const replServer = repl.start('> ')

class Contact{
  constructor(obj){
    this.id = obj.id || null
    this.name = obj.name
    this.company = obj.company
    this.phone = obj.phone
    this.email = obj.email  
  }
  
  static add(name,company,phone,email){
    let query = `INSERT into contacts (name,company,phone,email) VALUES ('${name}','${company}','${phone}','${email}')`
    db.run(query, function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log(`${JSON.stringify(name)} Added!`);
      }
    })
  }
  
  static deleteGroup(id){
    let query = `Delete from contacts where id = '${id}'`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
      rows.forEach((data)=>{
        console.log(`${data.name} Deleted!`);
      })  
      }
    })
  }
  
  static update(collumn,new_value,id){
    let query = `Update contacts set '${collumn}' = '${new_value}' where id = '${id}'`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        rows.forEach((data)=>{
          console.log(`${data.name} Deleted!`);
        })
      }
    })
  }
  
  static show(){
    let query = `Select * from contacts`
    db.all(query, function(err,rows){
      if(err){
        console.log(err);
      }
      else{
        console.log(`Table contacts list:\n`);
        rows.forEach((data)=>{
          console.log(`\n${data.id} | ${data.name} | ${data.company} | ${data.phone} | ${data.email}`);
        })
      }
    })
  }
  
   save() {
    let id = this.id,
    name = this.name,
    company = this.company,
    phone = this.phone,
    email = this.email,
    obj = this;
    if(Contact.emailValidation(email) || email===null){
      if(Contact.phoneValidation(phone) || phone === null){
        if(id===null){
          db.serialize(function(){
            db.run(`INSERT INTO contacts (name) VALUES ('${name}', '${company}', '${phone}', '${email}');`,function(err){
              if(err){
                console.log(err.message)
              } else {
                obj.id = this.lastID
                console.log(`ID:${obj.id} Name: ${name} inserted`)
              }
            })
          })
        } else {
          db.serialize(function(){
            db.run(`UPDATE contacts SET name = '${name}', company = '${company}', phone = '${phone}', email = '${email}' WHERE id = ${id};`, function(err){
              if(err){
                console.log(err.message)
              } else {
                console.log(`ID: ${id} updated`)
              }
            })
          })
        }
      } else {
        console.log("phone number is not valid")
      }
    } else {
      console.log("email is not valid")
    }
  }
  
   static emailValidation(email){
    let emailregex =  /\w.*@\w.*./;
    if(!emailregex.test(email)){
      return false
    }
    else{
      return true
    }
  }
  
   static phoneValidation(phone){
    if (phone.split('').length < 10 || phone.split('').length > 13){
      return false
    }
    return true
  }      
}

// let contact = new Contact({name:"nugraha",company:"delta",phone:"082345678901",email:"nugraha@gmail.com"})
// console.log(contact.id);
// contact.save()
// console.log(contact.id);  //wtf is this?? ini kan async mana bisa jir

 //export default Contact