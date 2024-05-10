// gui.js

const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

function createMainGui(startBackgroundChange, startRiotIdChange, startPracticeTool, startDodgeLobby, toggleAutoAccept) {
    // Create the browser window
    let mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the index.html file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open DevTools (Remove this in production)
    mainWindow.webContents.openDevTools();

    // Event when the window is closed
    mainWindow.on('closed', function () {
        // Dereference the window object
        mainWindow = null;
    });

    // Return the created window
    return mainWindow;
}

module.exports = { createMainGui };
