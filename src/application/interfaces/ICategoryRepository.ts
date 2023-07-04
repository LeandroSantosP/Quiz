import { Category } from "@/domain/quiz/Category";

export interface ICategoryRepository {
    save(category: Category): Promise<void>;
    getByName(name: string): Promise<Category | null>;
}
