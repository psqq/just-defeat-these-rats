
const time = 0;

/** @type {HTMLDivElement} */
const outputEl = document.querySelector('.output');

function getCurrentTime() {
    return time;
}

/**
 * @param {string} msg 
 */
function printMessage(msg) {
    const msgWithTime = `[${getCurrentTime()}] ${msg}`;
    outputEl.innerText = msgWithTime + "\n" + outputEl.innerText;
}

for (let i = 0; i < 60; i++)
    printMessage("Wellcome to game!");
