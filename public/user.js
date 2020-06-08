const {   ipcMain } =  require("electron");
const db = require('./db')
const mainWindow = require('./mainWindow');


const methode = User.prototype;

function User(){
 //db.run(`DROP TABLE user` )
    db.run(`CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT ,
        password TEXT ,
        UNIQUE(username, password)
       
    )`);
   
    
       
       
            db.run(
              `
                  INSERT OR IGNORE INTO user( username  , password  ) VALUES ('admin','admin')  
                  `,
              function(err) {
                console.log("insert")

                db.all(
                  `SELECT * FROM user`, function(err,rows){

                    console.log(rows)

                  });
             

              });
    
    
   
     //get user
     ipcMain.on("user", (event, value) => {
        db.all(
          `SELECT * FROM user WHERE username='${value.username}' AND password='${value.password}' AND id=1`,
          function(err, rows) {
            if (err) mainWindow.webContents.send("user", err);
            mainWindow.webContents.send("user", rows);
          }
        );
      });
}
module.exports = User;

