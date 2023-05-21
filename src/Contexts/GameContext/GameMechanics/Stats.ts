import { IPokemonStatsData } from "../../MainContext/types";

export function CompareStats(attacker: IPokemonStatsData, defender: IPokemonStatsData) {
    if (attacker.value > defender.value) {
        return 1;
    } else if (attacker.value < defender.value) {
        return -1;
    } else {
        return 0;
    }
}

export function SelectRandomStats(stats: IPokemonStatsData[]) {
    const randomIndex = Math.floor(Math.random() * stats.length);
    return stats[randomIndex];
}

export function GetStatsByName(stats: IPokemonStatsData[], name: string) {
    return stats.find((stat) => stat.name === name);
}
