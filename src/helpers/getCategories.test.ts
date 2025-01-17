import { getCategories } from "./getCategories";

import { mockMenu } from "../tests/jest.constants";

jest.mock("../constants/data.ts", () => ({
  get menu() {
    return mockMenu;
  },
}));

describe("getCategories.ts", () => {
  describe("General Tests.", () => {
    test("It should return a list of strings if 'getCategories' is execute with a menu.", () => {
      const categories = getCategories(mockMenu);

      expect(categories.length).toBeTruthy();
      expect(categories).toHaveLength(
        Array.from(new Set(mockMenu.map((category) => category.category)))
          .length
      );
    });
  });
});
