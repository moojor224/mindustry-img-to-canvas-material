const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

/**
 * @type {BrowserWindow}
 */
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, "site/preload.js"),
        },
    });
    mainWindow.loadFile("site/index.html");
    // mainWindow.maximize();
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(function () {
    createWindow();
    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

function listen(channel, callback) {
    ipcMain.on(channel, async function (event, packet) {
        // console.log("got message from site on channel", channel);
        let result = await callback(packet);
        // console.log("sending response to channel", channel + "-response");
        event.reply(channel + "-response", result);
    });
}
