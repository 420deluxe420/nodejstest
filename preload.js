const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    startBackgroundChange: () => ipcRenderer.send('start-background-change'),
    startRiotIdChange: () => ipcRenderer.send('start-riotid-change'),
    startPracticeTool: () => ipcRenderer.send('start-practice-tool'),
    startDodgeLobby: () => ipcRenderer.send('start-dodge-lobby'),
    toggleAutoAccept: () => ipcRenderer.send('toggle-auto-accept')
});
