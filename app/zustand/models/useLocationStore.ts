import { Location } from "@prisma/client";
import create from "zustand";
import { devtools } from "zustand/middleware";

interface LocationStore {
  locations: Location[];
  fetchLocations: () => Promise<void>;
}

const useLocationStore = create<LocationStore>()(
  devtools((set) => ({
    locations: [],
    fetchLocations: async () => {
      const locations = await fetch(
        "http://localhost:3000/api/find/location/all",
      ).then((res) => res.json());
      set({ locations });
    },
  })),
);

export default useLocationStore;
