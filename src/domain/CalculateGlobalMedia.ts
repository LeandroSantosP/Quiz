import { Ranking } from "./Ranking";

export class CalculateRankingGlobalMedia {
    readonly rankings: Ranking[];
    constructor(rankings: Ranking[]) {
        this.rankings = rankings;
    }

    calculateGlobalMedia() {
        let total = 0;
        for (const ranking of this.rankings) {
            total += ranking.grade;
        }
        return total / this.rankings.length;
    }
}
