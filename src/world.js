import player from "./player";
import rats from "./rats";

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
    },
    getLocationObjects: function* (loc) {
        for (let x of loc.beings) yield x;
        for (let x of loc.items) yield x;
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
        loc.beings = loc.beings.filter(x => x.id != obj.id);
        loc.items = loc.items.filter(x => x.id != obj.id);
    },
};

export default world;
