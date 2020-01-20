import world from "./world";
import * as ui from "./ui";
import Mustache from "mustache";

ui.printMessage("Добро пожаловать в игру!");

ui.printMessage(`Всё просто. Ваша задача увидеть сообщение
"Вы выйграли! :)"и избежать сообщения "Вы проиграли! :(".
Чтобы получить справку наберите '?'.`);

ui.printMessage(`А сейчас вас окружили 5 здоровых крыс!
Где? У вас дома, в подвале, откуда вы решили взять немного еды.
Для победы просто избавьтесь от них!`);

ui.printMessage("<hr>", false);

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
    if (cmd.startsWith("new game") || cmd.startsWith("ng")) {
        location.reload();
    } else if (world.checkLose() || world.checkWin()) {
        ui.printMessage("Вы закончили текущую игру. Чтобы начать новую наберите <b>new game</b> или <b>ng</b>.");
        return;
    } else if (cmd.startsWith("?")) {
        ui.printBaseHelp();
    } else if (cmd.startsWith("wia") || cmd.startsWith("wia")) {
        ui.printHelpMessage(`<i>${world.currentLocation.name}</i>`);
    } else if (cmd.startsWith("wit") || cmd.startsWith("what is there")) {
        var template = document.querySelector('.what-is-there-template').innerHTML;
        var rendered = Mustache.render(template, world.currentLocation);
        ui.printHelpMessage(rendered);
    } else if (cmd.startsWith("i")) {
        var template = document.querySelector('.being-template').innerHTML;
        var rendered = Mustache.render(template, world.player);
        ui.printHelpMessage(rendered);
    } else if (cmd.startsWith("l") || cmd.startsWith("look at")) {
        const cmdName = ["look at", "l"].find(x => cmd.startsWith(x));
        const args = cmd.slice(cmdName.length).trim().split(/\s+/);
        if (!args || !args.length) {
            ui.printHelpMessage("Выберите кого вы хотите осмотреть.");
            return;
        }
        const obj = world.getObjectByListNumber(world.currentLocation, parseInt(args[0]) - 1);
        if (!obj) {
            ui.printHelpMessage("Выбранный объект не найден.");
            return;
        }
        var template = document.querySelector('.being-template').innerHTML;
        var rendered = Mustache.render(template, obj);
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
