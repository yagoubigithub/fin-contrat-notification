const { ipcMain ,dialog } = require("electron");
const db = require("./db");
const mainWindow = require("./mainWindow");
const notificationWindow = require("./notificationWindow");

const converter = require('json-2-csv');

const fs = require('fs')

//utils

const {getCurrentDateTime } = require('./utils/methods')

const methode = Employee.prototype;

function Employee() {
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

  ipcMain.on("employee", (event, value) => {
    if (value.id) {
      //get one employeee

      db.all(`SELECT *  FROM employee  WHERE id=${value.id} LIMIT 1`, function (
        err,
        rows
      ) {
        if (err) mainWindow.webContents.send("employee", err);

        if (rows !== undefined) mainWindow.webContents.send("employee", rows);
      });
    } else {
      ReturnAllEmployee()
        .then((employees) => {
          mainWindow.webContents.send("employee", employees);
        })
        .catch((err) => {
          mainWindow.webContents.send("employee", err);
        });
    }
  });

  //ajouter
  ipcMain.on("employee:ajouter", (event, value) => {
    db.run(
      `
          INSERT  INTO employee( nom  , prenom , adresse , telephone , email, date_debut, date_fin , status  ) VALUES (? ,? , ? , ? ,?  ,?,? , ?)  
          `,[value.nom,value.prenom,value.adresse,value.telephone,value.email,value.date_debut,value.date_fin ,'undo'],
      function (err) {
        if (err) mainWindow.webContents.send("employee:ajouter", err);
        setTimeout(()=>{
         
           
          db.all(`SELECT *  FROM employee WHERE status="undo" ORDER BY id DESC `, function (err, rows) {
            const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
            if(rows !== undefined){
                rows.forEach(employee => {
                    const date_fin = employee.date_fin;
   
                  
                    if(compare(date_fin,today)){
        
                        notificationWindow.show()
                      
                            notificationWindow.webContents.send("employee:alarte", { employee})
                    
   
   
                    }
                    
                });
            }
            
           
        })
        },2000)

        ReturnAllEmployee()
          .then((employees) => {
            mainWindow.webContents.send("employee:ajouter", employees);
          })
          .catch((err) => {
            mainWindow.webContents.send("employee:ajouter", err);
          });
      }
    );
  });

  //delete

  ipcMain.on("employee:delete", (event, value) => {
    if (value.id !== undefined) {
      // get one maitre_douvrage
      db.run(
        `UPDATE employee  SET status='${value.status}' WHERE id = ${value.id};`,
        function (err) {
          if (err) mainWindow.webContents.send("employee:delete", err);

          setTimeout(()=>{
            
           
            db.all(`SELECT *  FROM employee WHERE status="undo" ORDER BY id DESC `, function (err, rows) {
           const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
              if(rows !== undefined){
                  rows.forEach(employee => {
                      const date_fin = employee.date_fin;
     
                    
                      if(compare(date_fin,today)){
          
                          notificationWindow.show()
                        
                              notificationWindow.webContents.send("employee:alarte", { employee})
                      
     
     
                      }
                      
                  });
              }
              
             
          })
          },2000)
          ReturnAllEmployee()
            .then((employees) => {
              mainWindow.webContents.send("employee:delete", employees);
            })
            .catch((err) => {
              mainWindow.webContents.send("employee:delete", err);
            });
        }
      );
    }
  });

  //modifier

  ipcMain.on("employee:modifier", (event, value) => {
    if (value.id !== undefined) {
      db.run(
        `UPDATE employee  SET nom=? , prenom=?,adresse=?,telephone=?,email=?, date_debut=?,date_fin=?,  status=? WHERE id = ?;`,[
          value.nom,value.prenom,value.adresse,value.telephone,value.email,value.date_debut,value.date_fin,value.status,value.id
        ],
        function (err) {
          if (err) mainWindow.webContents.send("employee:modifier", err);

          setTimeout(()=>{
           
           
            db.all(`SELECT *  FROM employee WHERE status="undo" ORDER BY id DESC `, function (err, rows) {

              const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
              if(rows !== undefined){
                  rows.forEach(employee => {
                      const date_fin = employee.date_fin;
     
                    
                      if(compare(date_fin,today)){
          
                          notificationWindow.show()
                        
                              notificationWindow.webContents.send("employee:alarte", { employee})
                      
     
     
                      }
                      
                  });
              }
              
             
          })
          },2000)
          ReturnAllEmployee()
            .then((employees) => {
              mainWindow.webContents.send("employee:modifier", employees);
            })
            .catch((err) => {
              mainWindow.webContents.send("employee:modifier", err);
            });
        }
      );
    }
  });

  ipcMain.on("employee:readFile", (event, value) => {

    if(value.path){

      fs.readFile(value.path, 'utf-8', (err, data) => {
        if(err){
          mainWindow.webContents.send("employee:readFile", "An error ocurred reading the file :" + err.message);
            
            return;
        }

        // Change how to handle the file content
        converter.csv2json(data,(err,array)=>{

          const values= []
          new Promise((resolve, reject)=>{
           
            console.log(array[0])
            if(array[0].nom !== undefined && array[0].prenom !== undefined && array[0].adresse !== undefined && array[0].telephone !== undefined && array[0].email !== undefined && array[0].date_debut !== undefined && array[0].date_fin !== undefined){
             
              deleteEmployee().then(()=>{
                let sql = `INSERT INTO employee(nom ,  prenom , adresse, telephone, email , date_debut , date_fin ,  status ) VALUES   `;
              let count = 0;
            
                array.forEach((e) => {
            
                  const placeholder = ` (?, ? , ? , ? , ? , ? , ? ,?) ,`;
                  sql = sql + placeholder;
                  count++;
                  values.push(e.nom,e.prenom,e.adresse,e.telephone,e.email,e.date_debut,e.date_fin,'undo')
      
                  if(count === array.length) {
                    console.log(values)
                    resolve(sql);}
                })
              }).catch(err=>{
                mainWindow.webContents.send("employee:readFile", err);
              })
            }else{
              mainWindow.webContents.send("employee:readFile", "error");
            }
            
          }).then((sql)=>{
            sql = sql.slice(0, sql.lastIndexOf(",") - 1);
            db.run(sql,values , (err)=>{
            
              if(err)  mainWindow.webContents.send("employee:readFile", err);
              setTimeout(()=>{
               
           
                db.all(`SELECT *  FROM employee WHERE status="undo" ORDER BY id DESC `, function (err, rows) {
                const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
                  if(rows !== undefined){
                      rows.forEach(employee => {
                          const date_fin = employee.date_fin;
         
                        
                          if(compare(date_fin,today)){
              
                              notificationWindow.show()
                            
                                  notificationWindow.webContents.send("employee:alarte", { employee})
                          
         
         
                          }
                          
                      });
                  }
                  
                 
              })
              },2000)
              ReturnAllEmployee()
              .then((employees) => {
                mainWindow.webContents.send("employee:readFile", employees);
              })
              .catch((err) => {
                mainWindow.webContents.send("employee:readFile", err);
              });
           
            })

          })



        })
    });
    }

   /*
    const result = [];
    if (value.path) {
      const wb = xlsx.readFile(value.path, {
        cellDates: true,
      });
      new Promise((resolve, reject) => {
        wb.SheetNames.forEach((sheetName, index) => {
          const ws = wb.Sheets[sheetName];
          let l = ws["!ref"].split(/\d+/gi);
          let d = ws["!ref"].split(/[A-Z]+/gi);
  
          const head = [];
  
          const _d = [];
          const _l = [];
  
          d.map((val1) => {
            if (val1 !== "") {
              if (val1.indexOf(":") != -1) {
                val1 = val1.replace(":", "");
              }
              _d.push(val1);
            }
          });
  
          l.map((val) => {
            if (val !== "") {
              if (val.indexOf(":") != -1) {
                val = val.replace(":", "");
              }
              _l.push(val);
            }
          });
  
          for (let i = _l[0].charCodeAt(0); i <= _l[1].charCodeAt(0); i++) {
            head.push(
              ws[`${String.fromCharCode(i)}${_d[0]}`] !== undefined
                ? ws[`${String.fromCharCode(i)}${_d[0]}`].v
                : undefined
            );
          }
          console.log(head);
          const array = []
         let  id = 1;
  
          for (let j = Number.parseInt(_d[0]) + 1; j <= Number.parseInt(_d[1]); j++) {
            const obj = {}
           
  
            for (let i = _l[0].charCodeAt(0) ; i <= _l[1].charCodeAt(0); i++) {
  
              obj.id = id;
              obj[ws[`${String.fromCharCode(i)}${_d[0]}`] !== undefined
              ? ws[`${String.fromCharCode(i)}${_d[0]}`].v
              : "_Empty"] = ws[`${String.fromCharCode(i)}${j}`] !== undefined
              ? ws[`${String.fromCharCode(i)}${j}`].v
              : "_Empty";
            }
          array.push(obj)
          id++;
  
  
          }
          console.log(array)
  
          
      
       result.push({
         name : sheetName,
         array, 
         head
  
       })
  
     
  
          if (result.length === wb.SheetNames.length) {
            resolve();
          }
        });
      })
        .then(() => {
          mainWindow.webContents.send("employee:readFile", result);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    */
  });
  
  
  ipcMain.on("employee:export", (event, value) => {
  
    generateCSV().then(({_export}) => {
      setTimeout(()=>{
       
           
        db.all(`SELECT *  FROM employee WHERE status="undo" ORDER BY id DESC `, function (err, rows) {
        const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
          if(rows !== undefined){
              rows.forEach(employee => {
                  const date_fin = employee.date_fin;
 
                
                  if(compare(date_fin,today)){
      
                      notificationWindow.show()
                    
                          notificationWindow.webContents.send("employee:alarte", { employee})
                  
 
 
                  }
                  
              });
          }
          
         
      })
      },2000)
      mainWindow.webContents.send("employee:export", {export : _export});
    })
    .catch((err) => {
      mainWindow.webContents.send("employee:export", err);
    });
  
  
  });
  
}





function ReturnAllEmployee() {
  const employees = [];

  return new Promise((resolve, reject) => {
    db.all(`SELECT *  FROM employee     ORDER BY id DESC`, function (
      err,
      rows
    ) {
      if (err) reject(err);
      if (rows !== undefined) {
        if (rows.length === 0) {
          resolve(employees);
        } else {
          resolve(rows);
          // ajouter contrat of all
        }
      }
    });
  });
}


function generateCSV  ()  {
  return new Promise((resolve, reject)=>{
    ReturnAllEmployee().then(employees=>{

      converter.json2csv(employees, (err, csv) => {
        if (err) {
            throw err;
        }
    
        // print CSV string
        console.log(csv);
        
    
        dialog.showOpenDialog(mainWindow, {
          properties: ['openFile', 'openDirectory' , 'promptToCreate' , 'showHiddenFiles']
        }).then(result => {
         
          if(!result.canceled){
            const d = getCurrentDateTime(new Date().getTime()).split('T')[0];
            const path = `${result.filePaths}/save-${d}.csv`
            
    
            // write CSV to a file
            fs.writeFile(path, csv, (err)=>{
              if(err) reject(err)
              

              resolve({_export : false})
    
             
    
            });
          }
         else{
          resolve({_export : false})
         }
        }).catch(err => {
          reject(err)
        })
        
    });
    }).catch(err=>{
    reject(err)
    })
  })


}

function deleteEmployee(){

  return new Promise((resolve, reject)=>{
    db.run(`DROP TABLE employee`  , (err=>{
      if(err) reject(err)


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
    )`,(err)=>{
      if(err) reject(err)

      resolve()
    });


    }))
  })
  
}
function compare(date1, date2){
  return date1 === date2
}



module.exports = Employee;
