import { CalculateRankingGlobalMedia } from "@/domain/CalculateGlobalMedia";
import { Ranking } from "@/domain/Ranking";

test("Deve criar um ranking", () => {
    const ranking = new Ranking("123", "124", 50);
    expect(ranking).toBeDefined();
});

test("Deve calcular a media global", () => {
    const rankings = [new Ranking("123", "124", 50), new Ranking("123", "124", 50), new Ranking("123", "124", 50)];
    const ranking = new CalculateRankingGlobalMedia(rankings);
    expect(ranking.calculateGlobalMedia()).toBe(50);
});
