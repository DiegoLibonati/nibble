import { getCategories } from "./getCategories";

import { MENU_MOCK } from "../tests/constants/constants";

test("It should return a list of strings if 'getCategories' is execute with a menu.", () => {
  const categories = getCategories(MENU_MOCK);

  expect(categories.length).toBeTruthy();
  expect(categories).toHaveLength(
    Array.from(new Set(MENU_MOCK.map((category) => category.category))).length
  );
});
