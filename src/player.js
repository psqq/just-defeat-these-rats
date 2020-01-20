import world from "./world";
import * as ui from "./ui";

const actions = [
    {
        id: "attack-action",
        name: "Атаковать",
        commands: ["attack"],
        duration: 1,
        doIt: (...args) => {
            if (!args || !args.length) {
                ui.printHelpMessage("Выберите кого атаковать.");
                return;
            }
            const obj = world.getObjectByListNumber(world.currentLocation, parseInt(args[0]) - 1);
            if (!obj) {
                ui.printHelpMessage("Выбранный объект не найден.");
                return;
            }
            const damage = world.getStat(player, "ad").value;
            ui.printMessage(`Вы атаковали <i>${obj.name}</i> и нанесли <i>${damage}</i> ед. урона.`);
            world.update(1);
        },
    },
];

const player = {
    id: "player",
    name: "Вы",
    stats: [
        {
            id: "hp",
            name: "Здоровье",
            value: 100,
            maxValue: 100,
        },
        {
            id: "ad",
            name: "Урон",
            value: 10,
        },
    ],
    items: [
        {
            id: "simple-clothes",
            name: "Простая одежда",
        },
    ],
    actions,
};

export default player;
