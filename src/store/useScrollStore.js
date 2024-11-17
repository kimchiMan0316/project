import { create } from "zustand";

const useScrollStore = create((set) => ({
    scrollY: 0,
    setScrollY: (y) => set({ scrollY: y }),
}));

export default useScrollStore;