const { ipcMain } = require("electron");
const db = require("./db");
const mainWindow = require("./mainWindow");
const isDev = require("electron-is-dev");
const methode = User.prototype;

function User() {
 // db.run(`DROP TABLE user` )
// db.run(`DROP TABLE licence` )


  db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username BLOB ,
        password BLOB 
        
       
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS licence (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT 
      
     
  )`);
 
 
  
  

  db.all(`SELECT * FROM user`, function (err, rows) {
    if(rows == undefined ){

    
        db.run(
          `INSERT  INTO user( username  , password  ) VALUES ('admin','admin')  
                        `,
          function (err) {
            console.log("insert");
      
            db.all(`SELECT * FROM user`, function (err, rows) {
              console.log(rows);
            });
          }
        );
      
      
    }
  });


  ipcMain.on("licence", (event, value) => {
    db.all(
      `SELECT * FROM licence WHERE  id=1`,
      function (err, rows) {
        if (err) mainWindow.webContents.send("licence", err);
        console.log(err,rows)
        if(rows.length > 0)
        mainWindow.webContents.send("licence", {...rows[0]  });
        else
        mainWindow.webContents.send("licence", {error : "Enter Key"  });
            }
    );
 
  });
  //licence:ajouter
  ipcMain.on("licence:ajouter", (event, value) => {
    db.run(
      "INSERT  INTO licence( `key`    ) VALUES (? ) ",[value.key],
      function (err) {
        if (err) mainWindow.webContents.send("licence:ajouter", err);
     

        console.log(err)
        db.all(
          `SELECT * FROM licence WHERE  id=1`,
          function (err, rows) {
            if (err) mainWindow.webContents.send("licence:ajouter", err);
            if(rows !== undefined)
            mainWindow.webContents.send("licence:ajouter", {...rows[0]  });
            else
            mainWindow.webContents.send("licence:ajouter", {key : null  });
                }
        );

            }
    );
 
  });
  //get user
  ipcMain.on("user", (event, value) => {
    if(value.username !== undefined){
      db.all(
        `SELECT * FROM user WHERE username='${value.username}' AND password='${value.password}' AND id=1`,
        function (err, rows) {
          if (err) mainWindow.webContents.send("user", err);
         
          mainWindow.webContents.send("user", {rows , direname : __dirname, isDev});
        }
      );
    } else {
      db.all(
        `SELECT * FROM user WHERE  id=1`,
        function (err, rows) {
          if (err) mainWindow.webContents.send("user", err);
          mainWindow.webContents.send("user", {rows , direname : __dirname, isDev});
        }
      );
    }
 
  });

  ipcMain.on("auth:modifier", (event, value) => {

    db.run(
      `UPDATE user  SET  username='${value.username}',password='${value.password}'  WHERE id=1;`,
      function(err) {
        if (err) mainWindow.webContents.send("auth:modifier", err);
      
    db.all(
      `SELECT * FROM user WHERE username='${value.username}' AND password='${value.password}' AND id=1`,
      function (err, rows) {
        if (err) mainWindow.webContents.send("auth:modifier", err);
        mainWindow.webContents.send("auth:modifier", rows);
      }
    );
      });

  });
  
}
module.exports = User;
