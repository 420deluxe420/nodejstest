const axios = require('axios');
const lockfile = require('lockfile');

async function dodgeLobby() {
    try {
        const { port, password } = lockfile.getLockfileInfo();
        if (!port || !password) {
            return { error: "Lockfile not found." };
        }

        const url = `https://127.0.0.1:${port}/lol-login/v1/session/invoke?destination=lcdsServiceProxy&method=call&args=[%22%22,%22teambuilder-draft%22,%22quitV2%22,%22%22]`;
        const auth = { username: 'riot', password }; // Assuming 'riot' is the username

        const response = await axios.post(url, null, { auth, httpsAgent: new (require('https').Agent)(), validateStatus: null });
        if (response.status === 200) {
            // Remove the line that triggers the message box
            // return { success: "Lobby dodged successfully" };
            return { success: "Lobby dodged successfully" }; // You can return this message if needed
        } else {
            return { error: `An error occurred: ${response.statusText}` };
        }
    } catch (error) {
        return { error: `An error occurred: ${error.message}` };
    }
}

module.exports = {
    dodgeLobby
};
