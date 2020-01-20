import world from "./world";
import * as actions from "./actions";

const rat1 = {
    id: "rat-1",
    groups: ["being", "rat"],
    name: "Крыса побольше",
    stats: [
        {
            id: "hp",
            name: "Здоровье",
            value: 49,
            maxValue: 49,
        },
        {
            id: "ad",
            name: "Урон",
            value: 19,
        },
    ],
    actions: [
        {
            id: "attack-action",
            name: "Атаковать",
        },
    ],
    update: () => {
        const loc = world.getObjectLocation(rat1);
        if (loc.id == world.currentLocation.id) {
            actions.attack(rat1, world.player);
        }
    }
};

export default [
    rat1,
    {
        id: "rat-2",
        name: "Большая крыса",
        stats: [
            {
                id: "hp",
                name: "Здоровье",
                value: 55,
                maxValue: 55,
            },
            {
                id: "ad",
                name: "Урон",
                value: 3,
            },
        ],
    },
    {
        id: "rat-3",
        name: "Крыса поменьше",
        stats: [
            {
                id: "hp",
                name: "Здоровье",
                value: 32,
                maxValue: 32,
            },
            {
                id: "ad",
                name: "Урон",
                value: 3,
            },
        ],
    },
    {
        id: "rat-4",
        name: "Не очень большая крыса",
        stats: [
            {
                id: "hp",
                name: "Здоровье",
                value: 24,
                maxValue: 24,
            },
            {
                id: "ad",
                name: "Урон",
                value: 6,
            },
        ],
    },
    {
        id: "rat-5",
        name: "Не маленькая крыса",
        stats: [
            {
                id: "hp",
                name: "Здоровье",
                value: 12,
                maxValue: 12,
            },
            {
                id: "ad",
                name: "Урон",
                value: 5,
            },
        ],
    },
];
