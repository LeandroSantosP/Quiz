export interface ICategoryDAO {
    getAll(): Promise<CategoryDAO[]>;
}

export type CategoryDAO = {
    name: string;
    description: string;
    id: string;
};
