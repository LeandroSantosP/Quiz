import { GetCategoriesQuery } from "@/application/query/GetCategoriesQuery";
import { CategoriesDAOMemory } from "@/infra/DAO/CategoriesDAOMemory";
test("Deve obter todas as categorias cadastradas.", async () => {
    const categoriesDao = new CategoriesDAOMemory();

    categoriesDao.categories = [
        { description: "test", id: "124", name: "Category Testing" },
        { description: "test", id: "1245", name: "Category Testing 2" },
    ];

    const getCategories = new GetCategoriesQuery(categoriesDao);

    const output = await getCategories.execute();

    expect(output[0].name).toBe("Category Testing");
    expect(output[1].name).toBe("Category Testing 2");
});
