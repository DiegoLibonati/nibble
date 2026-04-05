import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MenuPage from "@/pages/MenuPage/MenuPage";

import { mockMenu } from "@tests/__mocks__/menu.mock";

interface RenderPage {
  container: HTMLElement;
}

const renderPage = (): RenderPage => {
  const { container } = render(<MenuPage />);
  return { container };
};

describe("MenuPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the main element with aria-label 'Food menu'", () => {
    renderPage();
    expect(screen.getByRole("main", { name: "Food menu" })).toBeInTheDocument();
  });

  it("should render the 'Our Menu' heading", () => {
    renderPage();
    expect(screen.getByRole("heading", { name: "Our Menu" })).toBeInTheDocument();
  });

  it("should render the header section", () => {
    renderPage();
    expect(screen.getByRole("region", { name: "Menu header" })).toBeInTheDocument();
  });

  it("should render the category filters section", () => {
    renderPage();
    expect(screen.getByRole("region", { name: "Category filters" })).toBeInTheDocument();
  });

  it("should render the menu items section", () => {
    renderPage();
    expect(screen.getByRole("region", { name: "Menu items" })).toBeInTheDocument();
  });

  it("should render the 'all' category button", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Show all menu items" })).toBeInTheDocument();
  });

  it("should render a button for each unique category from the menu", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Filter menu by breakfast" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter menu by lunch" })).toBeInTheDocument();
  });

  it("should render all menu items on initial load", () => {
    renderPage();
    const itemsSection = screen.getByRole("region", { name: "Menu items" });
    expect(within(itemsSection).getAllByRole("article")).toHaveLength(mockMenu.length);
  });

  it("should filter items when a category button is clicked", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Filter menu by breakfast" }));

    const itemsSection = screen.getByRole("region", { name: "Menu items" });
    const articles = await within(itemsSection).findAllByRole("article");
    const expected = mockMenu.filter((f) => f.category === "breakfast").length;

    expect(articles).toHaveLength(expected);
  });

  it("should show only the clicked category's items after filtering", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Filter menu by breakfast" }));

    const breakfastItem = mockMenu.find((f) => f.category === "breakfast")!;
    const itemsSection = screen.getByRole("region", { name: "Menu items" });

    expect(
      await within(itemsSection).findByRole("article", { name: breakfastItem.title })
    ).toBeInTheDocument();
  });

  it("should not show items from other categories after filtering", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Filter menu by breakfast" }));

    const lunchItem = mockMenu.find((f) => f.category === "lunch")!;
    const itemsSection = screen.getByRole("region", { name: "Menu items" });

    await within(itemsSection).findAllByRole("article");

    expect(
      within(itemsSection).queryByRole("article", { name: lunchItem.title })
    ).not.toBeInTheDocument();
  });

  it("should restore all items when 'all' button is clicked after filtering", async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole("button", { name: "Filter menu by lunch" }));
    await user.click(screen.getByRole("button", { name: "Show all menu items" }));

    const itemsSection = screen.getByRole("region", { name: "Menu items" });
    const articles = await within(itemsSection).findAllByRole("article");

    expect(articles).toHaveLength(mockMenu.length);
  });

  it("should render the main element with the menu-page class", () => {
    const { container } = renderPage();
    const main = container.querySelector<HTMLElement>("main.menu-page");
    expect(main).toBeInTheDocument();
  });
});
