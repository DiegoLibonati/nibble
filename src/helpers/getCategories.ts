import { Food } from "@src/entities/app";

export const getCategories = (menu: Food[]): string[] => {
  return Array.from(new Set(menu.map((category) => category.category)));
};
