const electron = require("electron");
const isDev = require("electron-is-dev");
require('v8-compile-cache');
const AutoLaunch = require('auto-launch');




const path = require('path')

const { app , Tray} = electron;

let mainWindow ,  tray;



const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })

  // Create mainWindow, load the rest of the app, etc...
  app.on("ready", () => {
 
    let autoLaunch = new AutoLaunch({
      name: 'Expiration du contrat',
      path: app.getPath('exe'),
    });
    autoLaunch.isEnabled().then((isEnabled) => {
      if (!isEnabled) autoLaunch.enable();
    });
     mainWindow = require('./mainWindow');
    const notificationWindow = require('./notificationWindow');
   // mainWindow.maximize();
    // mainWindow.setMenu(null);
   
      const DevTools = require('./devTools')
    const devTools = new DevTools(isDev);
  
    const db = require("./db");
  
  
    const User = require('./user');
    const user = new User();
  
    const Emplyee = require('./emplyee');
    const emplyee = new Emplyee();
  
  
    const Task = require('./task');
    const task = new Task();
  
   
    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
    const iconPath = path.join(__dirname, `./assets/${iconName}`);
    tray = new Tray(iconPath);
  
    
  
    const {x , y} =   tray.getBounds()
  
     
    const {width,height} = notificationWindow.getBounds()
    const yPosition = process.platform === "darwin" ? y : y-height;
    notificationWindow.setBounds({
        x: x - width/2,
        y : yPosition,
        width ,
        height 
    })
  
  
    
    
    tray.on('click', ()=>{
      
       
       
      if(mainWindow.isVisible()){
  
        mainWindow.hide();
      }else{
         mainWindow.show();
      }
     
    })
    
  });
  
}



