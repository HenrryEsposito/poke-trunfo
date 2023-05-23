import { RandomBetween } from "../../../Utils/MathUtils";
import { IPokemonData, IPokemonStatsData } from "../../MainContext/types";
import { SelectRandomStats } from "./Stats";

export async function BotDecision(botDeck: IPokemonData[]) {
    const delayMin = 2000;
    const delayMax = 4000;

    const randomDelay = RandomBetween(delayMin, delayMax);

    const decision = new Promise<IPokemonStatsData>((resolve) => {
        setTimeout(() => {
            const randomStats = SelectRandomStats(botDeck[0].stats);
            resolve(randomStats);
        }, randomDelay);
    });

    const randomDecision = await decision;
    return randomDecision;
}