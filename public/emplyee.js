const {   ipcMain } =  require("electron");
const db = require('./db')
const mainWindow = require('./mainWindow');
const xlsx = require('xlsx');


const methode = Employee.prototype;

function Employee(){
 //db.run(`DROP TABLE employee` )
    db.run(`CREATE TABLE IF NOT EXISTS employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom BLOB ,
        prenom BLOB ,
        adresse BLOB ,
        telephone BLOB ,
        email BLOB ,
        date_debut BLOB,
        date_fin BLOB,
        status BLOB
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

//modifier
 
ipcMain.on("employee:modifier", (event, value) => {

  if (value.id !== undefined) {  
    db.run(
      `UPDATE employee  SET nom='${value.nom}', prenom='${value.prenom}',adresse='${value.adresse}',telephone='${value.telephone}',email='${value.email}', date_debut='${value.date_debut}',date_fin='${value.date_fin}',  status='${value.status}' WHERE id = ${value.id};`,
      function(err) {
        if (err) mainWindow.webContents.send("employee:modifier", err);

      
        ReturnAllEmployee().then(employees=>{
          mainWindow.webContents.send("employee:modifier", employees);
      })
      .catch(err=>{
          mainWindow.webContents.send("employee:modifier", err);
      })
      }
    );
  }

 });

}


ipcMain.on('employee:readFile',  (event, value) => {
  const myFile = {};
  if(value.path){
   const wb  = xlsx.readFile(value.path,{
     cellDates : true
   });
   new Promise((resolve,reject)=>{
    wb.SheetNames.forEach(sheetName=>{
      const ws = wb.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(ws);
  
      myFile[sheetName] = data;
      if(Object.keys(myFile).length === wb.SheetNames.length){
        resolve()
      }
  
  
    })
    
   

   }).then(()=>{
    mainWindow.webContents.send("employee:readFile", myFile);
   })
 
  




  }

})


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

