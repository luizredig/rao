import { User } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
}

const useUserStore = create<UserStore>()(
  devtools((set) => ({
    users: [],
    fetchUsers: async () => {
      const users = await fetch("http://localhost:3000/api/find/user/all").then(
        (res) => res.json(),
      );
      set({ users });
    },
  })),
);

export default useUserStore;
