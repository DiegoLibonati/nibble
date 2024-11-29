import "@testing-library/jest-dom";

import { MENU_MOCK } from "./constants/constants";

jest.mock("../constants/data.ts", () => ({
  get menu() {
    return MENU_MOCK;
  },
}));
