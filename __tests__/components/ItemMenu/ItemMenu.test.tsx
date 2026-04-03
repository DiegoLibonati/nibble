import { render, screen } from "@testing-library/react";

import type { ItemMenuProps } from "@/types/props";

import ItemMenu from "@/components/ItemMenu/ItemMenu";

type RenderComponent = {
  container: HTMLElement;
  props: ItemMenuProps;
};

const renderComponent = (overrides?: Partial<ItemMenuProps>): RenderComponent => {
  const props: ItemMenuProps = {
    title: "Test Food",
    price: 9.99,
    img: "test-image.jpg",
    desc: "A delicious test food item",
    ...overrides,
  };

  const { container } = render(<ItemMenu {...props} />);

  return { container, props };
};

describe("ItemMenu", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render an article element", () => {
    renderComponent();
    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("should render the article with aria-label matching the food title", () => {
    renderComponent({ title: "Pancakes" });
    expect(screen.getByRole("article", { name: "Pancakes" })).toBeInTheDocument();
  });

  it("should render an image with the correct src", () => {
    renderComponent({ img: "pancakes.jpg" });
    expect(screen.getByRole("img")).toHaveAttribute("src", "pancakes.jpg");
  });

  it("should render an image with alt text matching the food title", () => {
    renderComponent({ title: "Pancakes" });
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Pancakes");
  });

  it("should render the food title as an h2 heading", () => {
    renderComponent({ title: "Diner Double" });
    expect(screen.getByRole("heading", { level: 2, name: "Diner Double" })).toBeInTheDocument();
  });

  it("should render the price with $ prefix", () => {
    renderComponent({ price: 13.99 });
    expect(screen.getByText("$13.99")).toBeInTheDocument();
  });

  it("should render the price element with aria-label 'Price: ${price}'", () => {
    renderComponent({ price: 13.99 });
    expect(screen.getByLabelText("Price: $13.99")).toBeInTheDocument();
  });

  it("should render the description text", () => {
    renderComponent({ desc: "A tasty description" });
    expect(screen.getByText("A tasty description")).toBeInTheDocument();
  });

  it("should apply item-menu class to the article", () => {
    const { container } = renderComponent();
    const article = container.querySelector<HTMLElement>("article.item-menu");
    expect(article).toBeInTheDocument();
  });

  it("should apply item-menu__img class to the image", () => {
    const { container } = renderComponent();
    const img = container.querySelector<HTMLImageElement>("img.item-menu__img");
    expect(img).toBeInTheDocument();
  });
});
