const { ipcMain } = require("electron");
const db = require("./db");
const mainWindow = require("./mainWindow");
const xlsx = require("xlsx");

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
          INSERT  INTO employee( nom  , prenom , adresse , telephone , email, date_debut, date_fin , status  ) VALUES ('${value.nom}','${value.prenom}' , '${value.adresse}' , '${value.telephone}' ,'${value.email}'  ,'${value.date_debut}','${value.date_fin}' , 'undo')  
          `,
      function (err) {
        if (err) mainWindow.webContents.send("employee:ajouter", err);

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
        `UPDATE employee  SET nom='${value.nom}', prenom='${value.prenom}',adresse='${value.adresse}',telephone='${value.telephone}',email='${value.email}', date_debut='${value.date_debut}',date_fin='${value.date_fin}',  status='${value.status}' WHERE id = ${value.id};`,
        function (err) {
          if (err) mainWindow.webContents.send("employee:modifier", err);

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
}

ipcMain.on("employee:readFile", (event, value) => {
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

        for (let j = Number.parseInt(_d[0]) + 1; j <= Number.parseInt(_d[1]); j++) {
          const obj = {}
         

          for (let i = _l[0].charCodeAt(0) ; i <= _l[1].charCodeAt(0); i++) {

            obj[ws[`${String.fromCharCode(i)}${_d[0]}`] !== undefined
            ? ws[`${String.fromCharCode(i)}${_d[0]}`].v
            : "_Empty"] = ws[`${String.fromCharCode(i)}${j}`] !== undefined
            ? ws[`${String.fromCharCode(i)}${j}`].v
            : "_Empty";
          }
        array.push(obj)


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
});

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
module.exports = Employee;
