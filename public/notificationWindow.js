const isDev = require("electron-is-dev");
const path =  require('path')

const { BrowserWindow } = require("electron");



let notificationWindow = new BrowserWindow({
    show :false,
    webPreferences: {
      nodeIntegration: true,
      nativeWindowOpen: true
    },
    transparent : true,
    alwaysOnTop : true,
    skipTaskbar: true,
    resizable :false,
    height : 500,
   width : 400,
   frame : false,
   icon: `${path.join(__dirname, "./assets/logo.png")}`
  });
  notificationWindow.loadURL(
    isDev
      ? "http://localhost:3000/notifcation.html"
      : `file://${path.join(__dirname, "../build/notifcation.html")}`
  );
 


module.exports = notificationWindow;

