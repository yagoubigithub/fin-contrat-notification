const {   ipcMain } =  require("electron");
const db = require('./db')
const mainWindow = require('./mainWindow');


const methode = Employee.prototype;

function Employee(){
 //db.run(`DROP TABLE employee` )
    db.run(`CREATE TABLE IF NOT EXISTS employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT ,
        prenom TEXT ,
        adresse TEXT ,
        telephone TEXT ,
        email TEXT ,
        date_debut TEXT,
        date_fin TEXT,
        status TEXT
    )`);
   
    
       
       
    ipcMain.on('employee', (event, value)=>{
      if(value.id){
        //get one employeee


        db.all(
          `SELECT *  FROM employee  WHERE id=${value.id} LIMIT 1`,
          function (err, rows) {

            if(err) mainWindow.webContents.send("employee", err);

            if(rows !== undefined)
            mainWindow.webContents.send("employee", rows);


          });

      }else{
        ReturnAllEmployee().then(employees=>{
          mainWindow.webContents.send("employee", employees);
      })
      .catch(err=>{
          mainWindow.webContents.send("employee", err);
      })

      }

    })
        
    
   
     //ajouter
     ipcMain.on("employee:ajouter", (event, value) => {
        db.run(
          `
          INSERT  INTO employee( nom  , prenom , adresse , telephone , email, date_debut, date_fin , status  ) VALUES ('${value.nom}','${value.prenom}' , '${value.adresse}' , '${value.telephone}' ,'${value.email}'  ,'${value.date_debut}','${value.date_fin}' , 'undo')  
          `,
          function(err) {
              
            if (err) mainWindow.webContents.send("employee:ajouter", err);
           
            ReturnAllEmployee().then(employees=>{
                mainWindow.webContents.send("employee:ajouter", employees);
            })
            .catch(err=>{
                mainWindow.webContents.send("employee:ajouter", err);
            })
          }
        );
      });



 //delete
 
 ipcMain.on("employee:delete", (event, value) => {

  if (value.id !== undefined) {
    // get one maitre_douvrage

    if(value.status === "corbeille")
  

    db.run(
      `UPDATE employee  SET status='${value.status}' WHERE id = ${value.id};`,
      function(err) {
        if (err) mainWindow.webContents.send("employee:delete", err);

      
        ReturnAllEmployee().then(employees=>{
          mainWindow.webContents.send("employee:delete", employees);
      })
      .catch(err=>{
          mainWindow.webContents.send("employee:delete", err);
      })
      }
    );
  }

 });

}

function ReturnAllEmployee(){
    const employees = [];

    return new Promise((resolve, reject) => {
      db.all(
        `SELECT *  FROM employee     ORDER BY id DESC`,
        function (err, rows) {
          if (err) reject(err);
          if(rows !== undefined){
            if(rows.length === 0){
              resolve(employees);
            }else{
            resolve(rows)
            // ajouter contrat of all 
            }
    
          }
       
          
        }
      );
    });
}
module.exports = Employee;

