
const time = 1;

let lastMessageTime = -1;
let messageCounterInSameTime = 1;

/** @type {HTMLDivElement} */
const outputEl = document.querySelector('.output');

/** @type {HTMLInputElement} */
const inputEl = document.querySelector('.input');

/** @type {HTMLDivElement} */
const helpEl = document.querySelector('.help');

function printHelpMessage(msg) {
    helpEl.innerHTML = msg;
}

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
    name: "Подвал",
    beings: [
        {
            name: "Крыса побольше",
        },
        {
            name: "Большая крыса",
        },
        {
            name: "Крыса поменьше",
        },
        {
            name: "Не очень большая крыса",
        },
        {
            name: "Не маленькая крыса",
        },
    ],
    items: [
        {
            name: "Еда",
        },
    ],
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
    let cmd = originalCmd.trim().replace(/\s+/g, ' ').toLowerCase();
    if (cmd.startsWith("?")) {
        printBaseHelp();
    } else if (cmd.startsWith("wia") || cmd.startsWith("wia")) {
        printHelpMessage(`Вы находитесь здесь:<br>${currentLocation.name}`);
    } else if (cmd.startsWith("wit") || cmd.startsWith("what is there")) {
        var template = document.querySelector('.what-is-there-template').innerHTML;
        var rendered = Mustache.render(template, currentLocation);
        printHelpMessage(rendered);
    }
}
