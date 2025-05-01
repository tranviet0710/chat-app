import { create } from "zustand";
interface ThemeStore{
  theme: string
}
export const useThemeStore = create<ThemeStore>((set) => ({
  theme: localStorage.getItem("theme") || "light",
  setTheme: (theme: string) => {
    set({ theme });
    localStorage.setItem("theme", theme);
  },
}));
