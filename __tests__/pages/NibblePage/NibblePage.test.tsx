import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";

import NibblePage from "@/pages/NibblePage/NibblePage";

jest.mock("@/constants/menu", () => {
  const mockData = jest.requireActual("@tests/__mocks__/menu.mock");
  const { mockMenu } = mockData;
  return {
    __esModule: true,
    default: mockMenu,
  };
});

const renderPage = (): RenderResult => render(<NibblePage />);

describe("NibblePage", () => {
  describe("rendering", () => {
    it("should render the page heading", () => {
      renderPage();
      expect(screen.getByRole("heading", { name: "Our Menu" })).toBeInTheDocument();
    });

    it("should render all menu items on initial load", () => {
      renderPage();
      expect(screen.getByRole("article", { name: "buttermilk pancakes" })).toBeInTheDocument();
      expect(screen.getByRole("article", { name: "diner double" })).toBeInTheDocument();
    });

    it("should render the 'all' category button", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Show all menu items" })).toBeInTheDocument();
    });

    it("should render a category button for each unique category in the menu", () => {
      renderPage();
      expect(screen.getByRole("button", { name: "Filter menu by breakfast" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Filter menu by lunch" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should show only breakfast items when the breakfast category is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Filter menu by breakfast" }));
      expect(screen.getByRole("article", { name: "buttermilk pancakes" })).toBeInTheDocument();
      expect(screen.queryByRole("article", { name: "diner double" })).not.toBeInTheDocument();
    });

    it("should show only lunch items when the lunch category is clicked", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Filter menu by lunch" }));
      expect(screen.getByRole("article", { name: "diner double" })).toBeInTheDocument();
      expect(
        screen.queryByRole("article", { name: "buttermilk pancakes" })
      ).not.toBeInTheDocument();
    });

    it("should restore all items when 'all' button is clicked after filtering", async () => {
      const user = userEvent.setup();
      renderPage();
      await user.click(screen.getByRole("button", { name: "Filter menu by breakfast" }));
      await user.click(screen.getByRole("button", { name: "Show all menu items" }));
      expect(screen.getByRole("article", { name: "buttermilk pancakes" })).toBeInTheDocument();
      expect(screen.getByRole("article", { name: "diner double" })).toBeInTheDocument();
    });
  });
});
