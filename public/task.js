const methode = Task.prototype;


const db = require('./db')
const mainWindow = require('./mainWindow');

const notificationWindow = require('./notificationWindow')


function Task(){
     // Task
     let time = 30000;
     let heurInterval;
     db.get('SELECT * FROM alarte WHERE  id=1', (err, result)=>{
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
                              
                                    notificationWindow.webContents.send("employee:alarte", {employee})
                            


                            }
                            
                        });
                    }
                    
                   
                })
       
             },5000)

             break;
         
             default:
                 break;
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