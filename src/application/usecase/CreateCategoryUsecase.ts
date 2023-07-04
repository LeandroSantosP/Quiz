import { Category } from "@/domain/quiz/Category";
import { ICategoryRepository } from "../interfaces/ICategoryRepository";

export class CreateCategoryUsecase {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async execute(input: Input): Promise<void> {
        const category = await this.categoryRepository.getByName(input.name);
        if (category) throw new Error("Category Already exits!");
        await this.categoryRepository.save(new Category(input.name, input.description));
    }
}

type Input = {
    name: string;
    description: string;
};
