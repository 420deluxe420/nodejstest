const axios = require('axios');
const lockfile = require('lockfile');

// Global variable to track the state of auto accept
let autoAcceptEnabled = false;

function enableAutoAccept() {
    const { port } = lockfile.getLockfileInfo();
    if (!port) {
        return Promise.reject({ error: "Lockfile not found." });
    }

    const url = `https://127.0.0.1:${port}/lol-matchmaking/v1/ready-check/accept`;
    return axios.post(url, null, { httpsAgent: new (require('https').Agent)(), validateStatus: null })
        .then(response => {
            if (response.status === 200) {
                autoAcceptEnabled = true;
                return { message: "Auto accept enabled successfully." };
            } else {
                return Promise.reject({ error: "Failed to enable auto accept." });
            }
        })
        .catch(error => {
            return Promise.reject({ error: "Failed to enable auto accept.", details: error.message });
        });
}

function disableAutoAccept() {
    autoAcceptEnabled = false;
}

// Function to check if auto accept is enabled
function isAutoAcceptEnabled() {
    return autoAcceptEnabled;
}

module.exports = {
    enableAutoAccept,
    disableAutoAccept,
    isAutoAcceptEnabled
};
