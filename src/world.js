import player from "./player";
import rats from "./rats";
import * as ui from "./ui";
import { yellow } from "color-name";

const locations = [
    {
        id: "basement-at-home",
        name: "Подвал",
        beings: [].concat(rats),
        items: [
            {
                id: "food",
                name: "Еда",
                quantity: 60,
            },
        ],
    },
];

const world = {
    time: 1,
    player,
    currentLocation: locations[0],
    locations,
    printLoseMsg: () => {
        ui.printMessage(`Вы проиграли! :(`);
        ui.printMessage(`Не растраивайтесь! Получится в другой раз. Чтобы начать новую игру наберите <b>new game</b> или <b>ng</b>`);
    },
    printWinMsg: () => {
        ui.printMessage(`Вы выйграли! :)`);
        ui.printMessage(`Поздравляю! Чтобы начать новую игру наберите <b>new game</b> или <b>ng</b>`);
    },
    checkLose: () => {
        if (world.getStat(world.player, "hp").value <= 0) {
            return true;
        }
        return false;
    },
    checkWin: () => {
        if ([...world.getAllObjectsInGroup('rat')].length == 0) {
            return true;
        }
        return false;
    },
    getLocation: id => {
        return locations.find(x => x.id == id);
    },
    getObjectByListNumber: (location, i) => {
        if (i < 0) {
            return;
        } else if (i < location.beings.length) {
            return location.beings[i];
        } else if (i < location.beings.length + location.items.length) {
            return location.beings[i - location.beings.length];
        } else {
            return;
        }
    },
    getStat: (being, statId) => {
        return being.stats.find(x => x.id == statId);
    },
    update: dt => {
        for (let loc of world.locations) {
            for (let objInLoc of world.getLocationObjects(loc)) {
                if (objInLoc.update) {
                    objInLoc.update(dt);
                }
            }
        }
        world.time += dt;
        if (world.checkWin()) {
            world.printWinMsg();
        } else if (world.checkLose()) {
            world.printLoseMsg();
        }
    },
    getLocationObjects: function* (loc) {
        for (let x of loc.beings) yield x;
        for (let x of loc.items) yield x;
    },
    getAllObjects: function* () {
        for (let loc of world.locations) yield* world.getLocationObjects(loc);
    },
    getAllObjectsInGroup: function* (groupName) {
        for (let obj of world.getAllObjects()) {
            if (obj.groups && obj.groups.includes(groupName)) {
                yield obj;
            }
        }
    },
    isInLocation: (obj, loc) => {
        for (let objInLoc of world.getLocationObjects(loc)) {
            if (obj.id === objInLoc.id) {
                return loc;
            }
        }
    },
    getObjectLocation: obj => {
        for (let loc of world.locations) {
            if (world.isInLocation(obj, loc)) {
                return loc;
            }
        }
    },
    deleteObject: obj => {
        const loc = world.getObjectLocation(obj);
        if (!loc) {
            return;
        }
        loc.beings = loc.beings.filter(x => x.id != obj.id);
        loc.items = loc.items.filter(x => x.id != obj.id);
    },
};

export default world;
