const methode = Task.prototype;

const {ipcMain} = require("electron")
const db = require('./db')
const mainWindow = require('./mainWindow');
const isDev = require("electron-is-dev");
const path = require('path');

const notificationWindow = require('./notificationWindow')


function Task(){
     // Task
     const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
     const direname = path.resolve();
            

   
   
     notificationWindow.webContents.once("dom-ready",(event)=>{
           db.all(`SELECT *  FROM employee WHERE status="undo" ORDER BY id DESC `, function (err, rows) {
         
         if(rows !== undefined){
             rows.forEach(employee => {
                 const date_fin = employee.date_fin;

               
                 if(compare(date_fin,today)){
     
                     notificationWindow.show()
                   
                         notificationWindow.webContents.send("employee:alarte", { employee , direname,isDev})
                 


                 }
                 
             });
         }
         
        
     })
     })
    
     ipcMain.on('close-notification', (event,value)=>{

        notificationWindow.hide()
     })
     ipcMain.on("closeWindow",  (event,value)=>{
        mainWindow.hide()
     })
     ipcMain.on("minimizeWindow",  (event,value)=>{
        mainWindow.minimize()
     })
     ipcMain.on("changeScreen",  (event,value)=>{
        if(value.isFullScreen){
            mainWindow.unmaximize()
        }else{
            mainWindow.maximize()
            
           
        }
     })

    

}

function compare(date1, date2){
    return date1 === date2
}


function getCurrentDateTime (mills) {

    const d = new Date(mills);
    return `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` :d.getMonth() + 1 }-${
        d.getDate() < 10 ? `0${d.getDate() }` :d.getDate() 
    }T${
        d.getHours() < 10 ? `0${d.getHours() }` :d.getHours() 
    }:${
        d.getMinutes() < 10 ? `0${d.getMinutes() }` :d.getMinutes() 
    }`
}
module.exports = Task;