import { getCategories } from "@src/helpers/getCategories";

import { mockMenu } from "@tests/jest.constants";

jest.mock("@src/constants/menu", () => {
  const { mockMenu } = jest.requireActual("@tests/jest.constants");
  return { __esModule: true, default: mockMenu };
});

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
