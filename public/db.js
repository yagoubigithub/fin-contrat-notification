


const isDev = require("electron-is-dev");


const path = require('path')

let sqlite = require("sqlite3").verbose();
  let db = new sqlite.Database(
    
    isDev
    ? 'data.sqlite'
    : path.join(__dirname, "../../data.sqlite")


    , error => {
    if (error) return console.log(error.message)
    console.log("Connnect to sqlite3");
  });

  db.serialize(function() {

  });

  
  
  
module.exports = db;