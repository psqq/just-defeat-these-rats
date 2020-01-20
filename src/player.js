import world from "./world";
import * as ui from "./ui";
import * as actions from "./actions";

const playerActions = [
    {
        id: "attack-action",
        name: "Атаковать",
        commands: ["attack", "a"],
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
            actions.attack(player, obj);
            world.update(1);
        },
    },
];

const player = {
    id: "player",
    groups: ["being", "player"],
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
    actions: playerActions,
};

export default player;
