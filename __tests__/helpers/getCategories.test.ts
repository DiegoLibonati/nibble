import type { Food } from "@/types/app";

import { getCategories } from "@/helpers/getCategories";

const buildFood = (overrides?: Partial<Food>): Food => ({
  id: 1,
  title: "Test Food",
  category: "breakfast",
  price: 9.99,
  img: "test.jpg",
  desc: "A test food",
  ...overrides,
});

describe("getCategories", () => {
  it("should return an empty array for an empty menu", () => {
    expect(getCategories([])).toEqual([]);
  });

  it("should return a single category for a menu with one item", () => {
    const menu = [buildFood({ category: "breakfast" })];
    expect(getCategories(menu)).toEqual(["breakfast"]);
  });

  it("should return unique categories removing duplicates", () => {
    const menu = [
      buildFood({ id: 1, category: "breakfast" }),
      buildFood({ id: 2, category: "lunch" }),
      buildFood({ id: 3, category: "breakfast" }),
    ];
    expect(getCategories(menu)).toEqual(["breakfast", "lunch"]);
  });

  it("should return all categories when every item has a different category", () => {
    const menu = [
      buildFood({ id: 1, category: "breakfast" }),
      buildFood({ id: 2, category: "lunch" }),
      buildFood({ id: 3, category: "shakes" }),
    ];
    expect(getCategories(menu)).toEqual(["breakfast", "lunch", "shakes"]);
  });

  it("should preserve insertion order when deduplicating", () => {
    const menu = [
      buildFood({ id: 1, category: "shakes" }),
      buildFood({ id: 2, category: "breakfast" }),
      buildFood({ id: 3, category: "shakes" }),
    ];
    expect(getCategories(menu)).toEqual(["shakes", "breakfast"]);
  });

  it("should return one category when all items share the same category", () => {
    const menu = [
      buildFood({ id: 1, category: "breakfast" }),
      buildFood({ id: 2, category: "breakfast" }),
      buildFood({ id: 3, category: "breakfast" }),
    ];
    expect(getCategories(menu)).toHaveLength(1);
    expect(getCategories(menu)).toEqual(["breakfast"]);
  });
});
