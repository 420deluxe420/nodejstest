const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Function to retrieve the port and password from the League of Legends lockfile
function getLockfileInfo() {
    const lockfilePath = "/Applications/League of Legends.app/Contents/LoL/lockfile";
    try {
        const lockfileContent = fs.readFileSync(lockfilePath, 'utf8').trim().split(":");
        const port = lockfileContent[2];
        const password = lockfileContent[3];
        return { port, password };
    } catch (error) {
        console.error("Lockfile not found.", error);
        return { port: null, password: null };
    }
}

// Function to perform authenticated POST request
async function authenticatedPost(url, payload) {
    try {
        const { port, password } = getLockfileInfo();
        if (!port || !password) {
            throw new Error("Lockfile not found.");
        }
        const headers = { 'Content-Type': 'application/json' };
        const auth = { username: 'riot', password };
        const response = await axios.post(url, payload, { headers, auth, httpsAgent: new (require('https').Agent)(), validateStatus: null });
        return response.data;
    } catch (error) {
        console.error(error.message);
        return { error: "Lockfile not found." };
    }
}

module.exports = {
    getLockfileInfo,
    authenticatedPost
};
