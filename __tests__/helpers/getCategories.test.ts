import type { Food } from "@/types/app";

import { getCategories } from "@/helpers/getCategories";

describe("getCategories", () => {
  describe("with a non-empty menu", () => {
    it("should return unique categories", () => {
      const menu: Food[] = [
        { id: 1, title: "a", category: "breakfast", price: 10, img: "", desc: "" },
        { id: 2, title: "b", category: "lunch", price: 10, img: "", desc: "" },
        { id: 3, title: "c", category: "breakfast", price: 10, img: "", desc: "" },
      ];
      expect(getCategories(menu)).toEqual(["breakfast", "lunch"]);
    });

    it("should return one category when all items share the same category", () => {
      const menu: Food[] = [
        { id: 1, title: "a", category: "breakfast", price: 10, img: "", desc: "" },
        { id: 2, title: "b", category: "breakfast", price: 10, img: "", desc: "" },
      ];
      expect(getCategories(menu)).toEqual(["breakfast"]);
    });

    it("should preserve the order of first occurrence", () => {
      const menu: Food[] = [
        { id: 1, title: "a", category: "shakes", price: 10, img: "", desc: "" },
        { id: 2, title: "b", category: "breakfast", price: 10, img: "", desc: "" },
        { id: 3, title: "c", category: "lunch", price: 10, img: "", desc: "" },
      ];
      expect(getCategories(menu)).toEqual(["shakes", "breakfast", "lunch"]);
    });
  });

  describe("with an empty menu", () => {
    it("should return an empty array", () => {
      expect(getCategories([])).toEqual([]);
    });
  });
});
