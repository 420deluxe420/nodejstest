const { app, dialog, BrowserWindow } = require('electron');
const background = require('./background');
const riotid = require('./riotid');
const practice = require('./practice');
const gui = require('./gui');
const dodge = require('./dodge');
const autoaccept = require('./autoaccept');

// Function to start the 5v5 practice tool
function startPracticeTool() {
    practice.startPracticeTool();
}

// Function to change the background of the League of Legends client
async function changeBackground() {
    try {
        const champSkins = await background.getAllChampionSkins();
        if (!champSkins) {
            dialog.showErrorBox("Error", "Failed to fetch champion skins.");
            return;
        }

        const { response: championName } = await dialog.showMessageBox({
            type: 'question',
            message: 'Enter the champion name:',
            input: 'text',
        });
        if (!championName) return;

        const championNameLower = championName.toLowerCase();
        const matchingChampions = Object.keys(champSkins).filter(champ => champ.toLowerCase() === championNameLower);
        if (!matchingChampions.length) {
            dialog.showErrorBox("Error", `No skins found for ${championName}.`);
            return;
        } else if (matchingChampions.length > 1) {
            dialog.showErrorBox("Error", `Multiple champions found for ${championName}. Please be more specific.`);
            return;
        }

        const selectedChampion = matchingChampions[0];

        const skinWindow = new BrowserWindow({ width: 400, height: 300, title: `Skins for ${selectedChampion}` });
        skinWindow.loadURL(`data:text/html,
            <html>
                <body>
                    <h1>Skins for ${selectedChampion}</h1>
                    <ul>
                        ${champSkins[selectedChampion].map(skin => `<li><button onclick="window.api.setBackground('${selectedChampion}', '${skin.id}')">${skin.name}</button></li>`).join('')}
                    </ul>
                </body>
            </html>`);
    } catch (error) {
        dialog.showErrorBox("Error", error.message);
    }
}

// Function to change the Riot ID (nickname)
async function changeRiotId() {
    try {
        const { response: riotId } = await dialog.showMessageBox({
            type: 'question',
            message: 'Enter the new Riot ID (nickname):',
            input: 'text',
        });
        if (!riotId) return;

        const { response: tagLine } = await dialog.showMessageBox({
            type: 'question',
            message: 'Enter the tag line:',
            input: 'text',
        });
        if (!tagLine) return;

        const response = await riotid.changeRiotId(riotId, tagLine);
        if (response.isSuccess) {
            dialog.showMessageBox({ type: 'info', message: 'Riot ID changed successfully' });
        } else {
            dialog.showErrorBox("Riot ID Change", `Error: ${response.errorCode}\nReason: ${response.errorMessage}`);
        }
    } catch (error) {
        dialog.showErrorBox("Error", error.message);
    }
}

// Function to dodge the lobby
function startDodgeLobby() {
    try {
        const response = dodge.dodgeLobby();
        if (response.error) {
            // Remove the line below that triggers the message box
            // dialog.showErrorBox("Error", response.error);
        }
    } catch (error) {
        dialog.showErrorBox("Error", error.message);
    }
}

// Function to toggle auto-accept feature
function toggleAutoAccept() {
    if (autoaccept.isAutoAcceptEnabled()) {
        autoaccept.disableAutoAccept();
    } else {
        autoaccept.enableAutoAccept();
    }
    // Update the text of the auto-accept button if it's initialized
    if (autoAcceptButton) {
        autoAcceptButton.webContents.send('update-auto-accept-button', `Auto Accept: ${autoaccept.isAutoAcceptEnabled() ? 'ON' : 'OFF'}`);
    }
}

// Function to continuously check and auto-accept queue
function checkAutoAccept() {
    setInterval(() => {
        if (autoaccept.isAutoAcceptEnabled()) {
            autoaccept.enableAutoAccept();
        }
    }, 1000); // Check every second
}

// Main function to handle the application logic
function main() {
    // Define functions to pass to the GUI
    const startBackgroundChange = changeBackground;
    const startRiotIdChange = changeRiotId;

    // Create the main GUI
    let mainWindow;
    app.whenReady().then(() => {
        mainWindow = gui.createMainGui(startBackgroundChange, startRiotIdChange, startPracticeTool, startDodgeLobby, toggleAutoAccept);
        // Start the thread to continuously check auto-accept
        checkAutoAccept();
    });

    // Quit the app when all windows are closed
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

// Call the main function
main();
