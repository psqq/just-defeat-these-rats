
const time = 1;

let lastMessageTime = -1;
let messageCounterInSameTime = 1;

/** @type {HTMLDivElement} */
const outputEl = document.querySelector('.output');

/** @type {HTMLInputElement} */
const inputEl = document.querySelector('.input');

/** @type {HTMLDivElement} */
const helpEl = document.querySelector('.help');

function printBaseHelp() {
    helpEl.innerHTML = document.querySelector('.base-help').innerHTML;
}

function getCurrentTime() {
    return time;
}

/**
 * @param {string} msg 
 */
function printMessage(msg) {
    if (time == lastMessageTime) {
        messageCounterInSameTime++;
    } else {
        messageCounterInSameTime = 1;
    }
    const k = messageCounterInSameTime;
    const msgWithTime = `<div><b>[${getCurrentTime()}:${k}]</b> ${msg}</div>`;
    outputEl.innerHTML = msgWithTime + "<br>" + outputEl.innerHTML;
    lastMessageTime = time;
}

printMessage("Добро пожаловать в игру!");
printMessage(`Всё просто. Ваша задача увидеть сообщение
"Вы выйграли! :)"и избежать сообщения "Вы проиграли! :(".
Чтобы получить справку наберите '?'.`);
printMessage(`А сейчас вас окружили 5 здоровых крыс!
Где? У вас дома, в подвале, откуда вы решили взять немного еды.
Для победы просто победите их!`);

const basementAtHome = {
    name: "Подвал вашего дома",
};

let currentLocation = basementAtHome;

printBaseHelp();

inputEl.addEventListener('keydown', e => {
    if (e.key == "Enter") {
        onCommand(inputEl.value);
        inputEl.value = "";
    }
});

/**
 * @param {string} originalCmd 
 */
function onCommand(originalCmd) {
    let cmd = originalCmd.trim();
    if (["wia", "where i am"].includes(cmd)) {
        printMessage(`Вы находитесь здесь:<br>${currentLocation.name}`);
    }
}
