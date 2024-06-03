import { Role } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface RoleStore {
  roles: Role[];
  fetchRoles: () => Promise<void>;
}

const useRoleStore = create<RoleStore>()(
  devtools((set) => ({
    roles: [],
    fetchRoles: async () => {
      const roles = await fetch("http://localhost:3000/api/find/role/all").then(
        (res) => res.json(),
      );
      set({ roles });
    },
  })),
);

export default useRoleStore;
