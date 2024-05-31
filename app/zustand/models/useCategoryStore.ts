import { Category } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface CategoryStore {
  categories: Category[];
  fetchCategories: () => Promise<void>;
}

const useCategoryStore = create<CategoryStore>()(
  devtools((set) => ({
    categories: [],
    fetchCategories: async () => {
      const categories = await fetch(
        "http://localhost:3000/api/find/category/all",
      ).then((res) => res.json());
      set({ categories });
    },
  })),
);

export default useCategoryStore;
