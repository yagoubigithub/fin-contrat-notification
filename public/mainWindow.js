const isDev = require("electron-is-dev");
const path =  require('path')
const fs = require('fs');

const { BrowserWindow, app } = require("electron");
const Alert = require("electron-alert");

let alert = new Alert();


let mainWindow = new BrowserWindow({
    show :false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    },
   width : 900,
   height : 730,
   //resizable :false,
    frame : false,
    icon: `${path.join(__dirname, "./assets/logo.png")}`
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on('closed', function() {
    mainWindow = null;
});

app.on('window-all-closed', function() {
  if(process.platform != 'darwin')
      app.quit();
})

 
  if (!fs.existsSync(isDev
  ? "start.txt"
  : path.join(__dirname, "../../start.txt")
  
  )) {
    mainWindow.show()
    try { fs.writeFileSync(isDev
      ? "start.txt"
      : path.join(__dirname, "../../start.txt")
      , new Date().getTime(), 'utf-8'); }
  catch(e) { console.log('Failed to save the file !'); }
  }else{
    mainWindow.hide()
  } 

  

  mainWindow.on('close', ()=>{
    app.quit()
  })
module.exports = mainWindow;

