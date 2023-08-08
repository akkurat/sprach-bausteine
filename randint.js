export function randint(maxex) {
    return Math.floor(Math.random() * maxex);
}
export function rE(list) {
    return list[randint(list.length)];
}
