import world from "./world";
import * as ui from "./ui";
import Mustache from "mustache";

ui.printMessage("Добро пожаловать в игру!");

ui.printMessage(`Всё просто. Ваша задача увидеть сообщение
"Вы выйграли! :)"и избежать сообщения "Вы проиграли! :(".
Чтобы получить справку наберите '?'.`);

ui.printMessage(`А сейчас вас окружили 5 здоровых крыс!
Где? У вас дома, в подвале, откуда вы решили взять немного еды.
Для победы просто победите их!`);

ui.printBaseHelp();

/** @type {HTMLInputElement} */
const inputEl = document.querySelector('.input');

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
        ui.printBaseHelp();
    } else if (cmd.startsWith("wia") || cmd.startsWith("wia")) {
        ui.printHelpMessage(`<i>${world.currentLocation.name}</i>`);
    } else if (cmd.startsWith("wit") || cmd.startsWith("what is there")) {
        var template = document.querySelector('.what-is-there-template').innerHTML;
        var rendered = Mustache.render(template, world.currentLocation);
        ui.printHelpMessage(rendered);
    } else if (cmd.startsWith("i")) {
        var template = document.querySelector('.i-template').innerHTML;
        var rendered = Mustache.render(template, world.player);
        ui.printHelpMessage(rendered);
    } else {
        for (let a of world.player.actions) {
            const actionCmd = a.commands.filter(x => cmd.startsWith(x))[0];
            if (actionCmd) {
                const args = cmd.slice(actionCmd.length).trim().split(/\s+/);
                a.doIt(...args);
                break;
            }
        }
    }
}
