const isDev = require("electron-is-dev");
const path =  require('path')

const { BrowserWindow, app } = require("electron");



let mainWindow = new BrowserWindow({
    show :false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    },
   width : 900,
   height : 730,
   //resizable :false,
    //frame : false,
    icon: `${path.join(__dirname, "./assets/logo.png")}`
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
 


  mainWindow.on('close', ()=>{
    app.quit()
  })
module.exports = mainWindow;

