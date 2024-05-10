const lockfile = require('./lockfile');
const axios = require('axios');

// Function to change the Riot ID (nickname)
async function changeRiotId(newNickname, tagLine) {
    try {
        // Retrieve port and password from the lockfile
        const { port, password } = lockfile.getLockfileInfo();
        if (!port || !password) {
            throw new Error("Lockfile not found.");
        }

        // Endpoint for changing the Riot ID
        const url = `https://127.0.0.1:${port}/lol-summoner/v1/save-alias`;
        const headers = { 'Content-Type': 'application/json' };

        // Payload for changing the Riot ID
        const data = {
            gameName: newNickname,
            tagLine: tagLine
        };

        // Send the request to change the Riot ID
        const auth = { username: 'riot', password };
        const response = await axios.post(url, data, { headers, auth, httpsAgent: new (require('https').Agent)(), validateStatus: null });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { error: "Failed to change Riot ID." };
    }
}

module.exports = {
    changeRiotId
};
