import "@testing-library/jest-dom";

import { mockAssets } from "@tests/__mocks__/assets.mock";
import { mockMenu } from "@tests/__mocks__/menu.mock";

jest.mock("@/assets/export", () => ({
  __esModule: true,
  default: mockAssets,
}));

jest.mock("@/constants/menu", () => {
  return { __esModule: true, default: mockMenu };
});
