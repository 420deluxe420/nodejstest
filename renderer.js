// renderer.js

// Function to handle button click for changing background
document.getElementById("changeBackground").addEventListener("click", function() {
    console.log("Change Background button clicked");
    // Call the function defined in gui.js to start changing background
    window.api.startBackgroundChange();
});

// Function to handle button click for changing Riot ID
document.getElementById("changeRiotId").addEventListener("click", function() {
    console.log("riotid");
    // Call the function defined in gui.js to start changing Riot ID
    window.api.startRiotIdChange();
});

// Function to handle button click for starting 5v5 Practice Tool
document.getElementById("startPracticeTool").addEventListener("click", function() {
    console.log("prac tool");
    // Call the function defined in gui.js to start 5v5 Practice Tool
    window.api.startPracticeTool();
});

// Function to handle button click for dodging lobby
document.getElementById("dodgeLobby").addEventListener("click", function() {
    console.log("dodge");
    // Call the function defined in gui.js to start dodging lobby
    window.api.startDodgeLobby();
});

// Function to handle button click for toggling auto accept
document.getElementById("toggleAutoAccept").addEventListener("click", function() {
    console.log("autoaccept");
    // Call the function defined in gui.js to toggle auto accept
    window.api.toggleAutoAccept();
});
