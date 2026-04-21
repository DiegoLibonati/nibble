import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { BtnCategoryProps } from "@/types/props";

import BtnCategory from "@/components/BtnCategory/BtnCategory";

const renderComponent = (props: Partial<BtnCategoryProps> = {}): RenderResult => {
  const defaultProps: BtnCategoryProps = {
    category: "breakfast",
    onClick: jest.fn(),
    ...props,
  };
  return render(<BtnCategory {...defaultProps} />);
};

describe("BtnCategory", () => {
  describe("rendering", () => {
    it("should render a button with the category text", () => {
      renderComponent({ category: "breakfast" });
      expect(screen.getByRole("button", { name: /breakfast/i })).toBeInTheDocument();
    });

    it("should render with aria-label for the 'all' category", () => {
      renderComponent({ category: "all" });
      expect(screen.getByRole("button", { name: "Show all menu items" })).toBeInTheDocument();
    });

    it("should render with aria-label for a specific category", () => {
      renderComponent({ category: "lunch" });
      expect(screen.getByRole("button", { name: "Filter menu by lunch" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should call onClick when the button is clicked", async () => {
      const mockOnClick = jest.fn();
      const user = userEvent.setup();
      renderComponent({ onClick: mockOnClick });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
