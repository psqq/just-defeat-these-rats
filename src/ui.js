import world from "./world";

let lastMessageTime = -1;
let messageCounterInSameTime = 1;

/** @type {HTMLDivElement} */
const outputEl = document.querySelector('.output');

/** @type {HTMLDivElement} */
const helpEl = document.querySelector('.help');

export function printHelpMessage(msg) {
    helpEl.innerHTML = msg;
}

export function printBaseHelp() {
    helpEl.innerHTML = document.querySelector('.base-help').innerHTML;
}

/**
 * @param {string} msg 
 */
export function printMessage(msg) {
    if (world.time == lastMessageTime) {
        messageCounterInSameTime++;
    } else {
        outputEl.innerHTML = "<hr>" + outputEl.innerHTML;
        messageCounterInSameTime = 1;
    }
    const k = messageCounterInSameTime;
    const msgWithTime = `<div><b>[${world.time}:${k}]</b> ${msg}</div>`;
    outputEl.innerHTML = msgWithTime + "<br>" + outputEl.innerHTML;
    lastMessageTime = world.time;
}
