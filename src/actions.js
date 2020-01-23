import * as ui from "./ui";
import world from "./world";

export function attack(a, b) {
    const damage = world.getStat(a, "ad").value;
    const hp = world.getStat(b, "hp");
    hp.value -= damage;
    ui.printMessage(`<i>${a.name}</i> атаковал <i>${b.name}</i> и нанес <i>${damage}</i> ед. урона.`);
    if (hp.value <= 0) {
        ui.printMessage(`<i>${a.name}</i> убил <i>${b.name}</i>.`);
        world.deleteObject(b);
    }
}

export function take(a, b, n) {
}
