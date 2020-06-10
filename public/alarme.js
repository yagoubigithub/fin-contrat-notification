const { ipcMain } = require("electron");
const db = require("./db");
const mainWindow = require("./mainWindow");

const methode = Alarme.prototype;

function Alarme() {
 
  

 
  //get alarme
  ipcMain.on("alarme", (event, value) => {
    db.all(
      `SELECT * FROM alarte WHERE id=1`,
      function (err, rows) {
        console.log(rows)
        if (err) mainWindow.webContents.send("alarme", err);
        mainWindow.webContents.send("alarme", rows);
      }
    );
  });

  //modifer alarme
  ipcMain.on("alarme:modifer", (event, value) => {
    console.log("modifier")
     
        db.run(
            `UPDATE alarte  SET repeter='${value.repeter}', son='${value.son}' WHERE id=1 `,
            function (err) {
             
              db.all(
                `SELECT * FROM alarte WHERE id=1`,
                function (err, rows) {
                  
                  if (err) mainWindow.webContents.send("alarme:modifer", err);
                  mainWindow.webContents.send("alarme:modifer", rows);
                }
              );
            }
          );
      
   
  });
  
}
module.exports = Alarme;
