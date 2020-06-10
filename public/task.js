const methode = Task.prototype;

const {ipcMain} = require("electron")
const db = require('./db')
const mainWindow = require('./mainWindow');

const notificationWindow = require('./notificationWindow')


function Task(){
     // Task
     let time = 1 * 60 * 60 * 1000;
     let heurInterval;
     setTimeout(()=>{
 db.get('SELECT * FROM alarte WHERE  id=1', (err, result)=>{
     
     if(result !== undefined){
       const repeter = result.repeter;


         switch (repeter) {
             case "heurs" :
                
                
              heurInterval =    setInterval(()=>{
                    //console.log("task")
                     const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
            
                     db.all(`SELECT *  FROM employee     ORDER BY id DESC `, function (err, rows) {
                         
                         if(rows !== undefined){
                             rows.forEach(employee => {
                                 const date_fin = employee.date_fin;
            
                                 if(compare(date_fin,today)){
                                     console.log("employee ", employee.nom)
                                     notificationWindow.show()
                              
                                     notificationWindow.webContents.send("employee:alarte", {alarme : result , employee})
                             
                                 }
                                 
                             });
                         }
                         
                        
                     })
            
                 },time)
             

             break;



             case 'jours' :

             clearInterval(heurInterval)
             setTimeout(()=>{


                const today = getCurrentDateTime(new Date().getTime()).split('T')[0];
            
                db.all(`SELECT *  FROM employee     ORDER BY id DESC `, function (err, rows) {
                    
                    if(rows !== undefined){
                        rows.forEach(employee => {
                            const date_fin = employee.date_fin;
       
                            if(compare(date_fin,today)){
                                console.log("employee", employee.nom)
                                notificationWindow.show()
                              
                                    notificationWindow.webContents.send("employee:alarte", {alarme : result , employee})
                            


                            }
                            
                        });
                    }
                    
                   
                })
       
             },5000)

             break;
         
             default:
                 break;
         }   
     }
        

     })

     },2000)
    
     ipcMain.on('close-notification', (event,value)=>{

        notificationWindow.hide()
     })
     ipcMain.on("closeWindow",  (event,value)=>{
        mainWindow.hide()
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