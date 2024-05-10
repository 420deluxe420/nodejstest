const axios = require('axios');
const lockfile = require('lockfile');

// Function to fetch information about all champion skins
async function getAllChampionSkins() {
    try {
        const url = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json";
        const response = await axios.get(url);
        if (response.status !== 200) {
            console.error("Failed to fetch champion skins:", response.status);
            return null;
        }
        const skinsData = response.data;

        const champSkins = {};
        Object.entries(skinsData).forEach(([champId, skinInfo]) => {
            const champName = skinInfo.loadScreenPath.split("ASSETS/Characters/")[1].split("/")[0];
            if (!champSkins[champName]) {
                champSkins[champName] = [];
            }
            if (skinInfo.isBase) {
                champSkins[champName].push({ id: champId, name: "default" });
            } else if (skinInfo.questSkinInfo) {
                skinInfo.questSkinInfo.tiers.forEach(skinTier => {
                    champSkins[champName].push({ id: skinTier.id, name: skinTier.name });
                });
            } else {
                champSkins[champName].push({ id: champId, name: skinInfo.name });
            }
        });

        return champSkins;
    } catch (error) {
        console.error("Failed to fetch champion skins:", error.message);
        return null;
    }
}

// Function to change the background skin of the League of Legends client
async function changeBackgroundSkin(value) {
    try {
        const { port, password } = lockfile.getLockfileInfo();
        if (!port || !password) {
            return { error: "Lockfile not found." };
        }
        const url = `https://127.0.0.1:${port}/lol-summoner/v1/current-summoner/summoner-profile/`;
        const headers = { 'Content-Type': 'application/json' };
        const data = {
            key: "backgroundSkinId",
            value: value,
            regalia: "{\"bannerType\":2,\"crestType\":1,\"selectedPrestigeCrest\":1}"
        };
        const response = await lockfile.authenticatedPost(url, data);
        return response;
    } catch (error) {
        console.error("Failed to change background skin:", error.message);
        return { error: "Failed to change background skin." };
    }
}

module.exports = {
    getAllChampionSkins,
    changeBackgroundSkin
};
