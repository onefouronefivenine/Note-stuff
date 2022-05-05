const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
     // We cannot require the screen module until the app is ready.
    const { screen } = require('electron')

    // Create a window that fills the screen's available work area.
    const primaryDisplay = screen.getPrimaryDisplay()
    const { width, height } = {
                                width: primaryDisplay.workAreaSize.width - 500,
                                height: primaryDisplay.workAreaSize.height - 200
                            };

    //create a fullscreen window
    const win = new BrowserWindow({
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            enableRemoteModule: true,
            contextIsolation: false,
        }
    });

    //load the html file
    win.loadFile('content/index.html');

    ipcMain.on("requestDataPath", (event, arg) => {
        event.returnValue = app.getPath("appData");
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

ipcMain.handle("close", (event, arg) => {
    app.quit();
})