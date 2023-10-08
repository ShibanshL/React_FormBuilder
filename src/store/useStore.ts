import { create } from "zustand";

const useBearStore = create((set) => ({
  message: "",
  setMessage: (e: any) => set(() => ({ message: e })),
}));

const usePage = create((set) => ({
  page: "",
  setPage: (e: any) => set(() => ({ page: e })),
}));

export { useBearStore, usePage };
