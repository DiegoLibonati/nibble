import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { BtnCategoryProps } from "@/types/props";

import BtnCategory from "@/components/BtnCategory/BtnCategory";

type RenderComponent = {
  container: HTMLElement;
  props: BtnCategoryProps;
};

const mockOnClick = jest.fn();

const renderComponent = (overrides?: Partial<BtnCategoryProps>): RenderComponent => {
  const props: BtnCategoryProps = {
    category: "breakfast",
    onClick: mockOnClick,
    ...overrides,
  };

  const { container } = render(<BtnCategory {...props} />);

  return { container, props };
};

describe("BtnCategory", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render a button element", () => {
    renderComponent();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should have type='button' to prevent accidental form submission", () => {
    renderComponent();
    expect(screen.getByRole("button")).toHaveAttribute("type", "button");
  });

  it("should apply the btn-category class", () => {
    renderComponent();
    expect(screen.getByRole("button")).toHaveClass("btn-category");
  });

  it("should display the category as text content", () => {
    renderComponent({ category: "lunch" });
    expect(screen.getByRole("button")).toHaveTextContent("lunch");
  });

  it("should render aria-label as 'Show all menu items' when category is 'all'", () => {
    renderComponent({ category: "all" });
    expect(screen.getByRole("button", { name: "Show all menu items" })).toBeInTheDocument();
  });

  it("should render aria-label as 'Filter menu by {category}' for non-all categories", () => {
    renderComponent({ category: "breakfast" });
    expect(screen.getByRole("button", { name: "Filter menu by breakfast" })).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByRole("button"));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should not call onClick when not clicked", () => {
    renderComponent();
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
