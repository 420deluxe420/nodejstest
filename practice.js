const lockfile = require('./lockfile');
const axios = require('axios');

// Function to start the 5v5 practice tool lobby
async function startPracticeTool() {
    try {
        // Endpoint for creating the practice tool lobby
        const port = lockfile.getLockfileInfo().port;
        const url = `https://127.0.0.1:${port}/lol-lobby/v2/lobby`;

        // Payload for creating the lobby
        const payload = {
            customGameLobby: {
                configuration: {
                    gameMode: "PRACTICETOOL",
                    gameMutator: "",
                    gameServerRegion: "",
                    mapId: 11,  // Summoner's Rift
                    mutators: { id: 1 },  // Summoner's Rift
                    spectatorPolicy: "AllAllowed",
                    teamSize: 5  // 5v5
                },
                lobbyName: "KBOT",  // Lobby name
                lobbyPassword: null  // Lobby password (optional)
            },
            isCustom: true  // Indicates it's a custom lobby
        };

        // Send the request to create the lobby
        const response = await lockfile.authenticatedPost(url, payload);
        return response;
    } catch (error) {
        console.error(error.message);
        return { error: "Failed to start practice tool." };
    }
}

module.exports = {
    startPracticeTool
};
