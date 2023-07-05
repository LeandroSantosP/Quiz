import { ICategoryDAO } from "../interfaces/ICategoryDAO";

export class GetCategoriesQuery {
    constructor(private readonly categoryDAO: ICategoryDAO) {}

    async execute() {
        return await this.categoryDAO.getAll();
    }
}
