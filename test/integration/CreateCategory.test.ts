import { CreateCategoryUsecase } from "@/application/usecase/CreateCategoryUsecase";
import { CategoryRepositoryMemory } from "@/infra/repositories/CategoryRepositoryMemory";

test("Deve criar uma categoria", async () => {
    const categoryRepository = new CategoryRepositoryMemory();
    const CreateCategory = new CreateCategoryUsecase(categoryRepository);

    const input = {
        name: "Programming",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    };

    await CreateCategory.execute(input);

    expect(categoryRepository.categories.length).toBe(1);
    expect(categoryRepository.categories[0].name).toBe("Programming");
    expect(categoryRepository.categories[0].description).toBeDefined();
});

test("Deve lançar um erro caso a categoria ja exita!", async () => {
    const categoryRepository = new CategoryRepositoryMemory();
    const CreateCategory = new CreateCategoryUsecase(categoryRepository);

    const input = {
        name: "Programming",
        description:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    };

    await CreateCategory.execute(input);
    await expect(() => CreateCategory.execute(input)).rejects.toThrow(new Error("Category Already exits!"));
});
