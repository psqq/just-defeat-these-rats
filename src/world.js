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
        world.time += dt;
    },
};

export default world;
