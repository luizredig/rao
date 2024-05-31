import { Tag } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface TagStore {
  tags: Tag[];
  fetchTags: () => Promise<void>;
}

const useTagStore = create<TagStore>()(
  devtools((set) => ({
    tags: [],
    fetchTags: async () => {
      const tags = await fetch("http://localhost:3000/api/find/tag/all").then(
        (res) => res.json(),
      );
      set({ tags });
    },
  })),
);

export default useTagStore;
