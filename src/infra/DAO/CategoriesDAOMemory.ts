import { CategoryDAO, ICategoryDAO } from "@/application/interfaces/ICategoryDAO";

export class CategoriesDAOMemory implements ICategoryDAO {
    categories: CategoryDAO[] = [];

    async getAll(): Promise<CategoryDAO[]> {
        return this.categories;
    }
}
