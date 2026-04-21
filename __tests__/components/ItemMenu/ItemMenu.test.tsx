import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { ItemMenuProps } from "@/types/props";

import ItemMenu from "@/components/ItemMenu/ItemMenu";

const renderComponent = (props: Partial<ItemMenuProps> = {}): RenderResult => {
  const defaultProps: ItemMenuProps = {
    title: "buttermilk pancakes",
    price: 15.99,
    img: "test-image.jpg",
    desc: "A delicious breakfast item",
    ...props,
  };
  return render(<ItemMenu {...defaultProps} />);
};

describe("ItemMenu", () => {
  describe("rendering", () => {
    it("should render the item title", () => {
      renderComponent();
      expect(screen.getByRole("heading", { name: "buttermilk pancakes" })).toBeInTheDocument();
    });

    it("should render the item price", () => {
      renderComponent({ price: 15.99 });
      expect(screen.getByText("$15.99")).toBeInTheDocument();
    });

    it("should render the item image with correct src and alt", () => {
      renderComponent({ img: "test-image.jpg", title: "buttermilk pancakes" });
      const img = screen.getByRole("img", { name: "buttermilk pancakes" });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "test-image.jpg");
    });

    it("should render the item description", () => {
      renderComponent({ desc: "A delicious breakfast item" });
      expect(screen.getByText("A delicious breakfast item")).toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("should have an aria-label equal to the title", () => {
      renderComponent({ title: "buttermilk pancakes" });
      expect(screen.getByRole("article", { name: "buttermilk pancakes" })).toBeInTheDocument();
    });

    it("should render the price with an accessible aria-label", () => {
      renderComponent({ price: 9.99 });
      expect(screen.getByLabelText("Price: $9.99")).toBeInTheDocument();
    });
  });
});
