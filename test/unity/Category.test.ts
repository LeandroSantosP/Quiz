import { Category } from "@/domain/quiz/Category";

test("Deve criar uma categoria", () => {
    const category = new Category(
        "Programming",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        "124"
    );

    expect(category).toBeDefined();
});

test("Nao deve ser possível criar uma descrição com descrição com menos que de 30 - caracteres", () => {
    expect(() => new Category("Programming", "Lorem Ipsum is simply", "124")).toThrowError(
        "Description must be grater than 30 caracteres!"
    );
});
