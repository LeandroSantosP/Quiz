import { ICategoryRepository } from "@/application/interfaces/ICategoryRepository";
import { Category } from "@/domain/quiz/Category";

export class CategoryRepositoryMemory implements ICategoryRepository {
    categories: Category[] = [];
    async save(category: Category): Promise<void> {
        this.categories.push(category);
    }

    async getByName(name: string): Promise<Category | null> {
        const category = this.categories.find((category) => category.name === name);

        return category ?? null;
    }
}
