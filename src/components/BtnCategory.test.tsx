import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { BtnCategory } from "./BtnCategory";

import { mockMenu } from "../tests/jest.constants";

type RenderComponent = {
  props: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    category: string;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const FOOD = mockMenu[0];

  const props = {
    onClick: jest.fn(),
    category: FOOD.category,
  };

  const { container } = render(
    <BtnCategory category={props.category} onClick={props.onClick} />
  );

  return {
    container: container,
    props: props,
  };
};

jest.mock("../constants/data.ts", () => ({
  get menu() {
    return mockMenu;
  },
}));

describe("BtnCategory.tsx", () => {
  describe("General Tests.", () => {
    test("It should render a button with the category name and execute onClick fn when executed.", async () => {
      const { props } = renderComponent();

      const btn = screen.getByRole("button", {
        name: `${props.category} button`,
      });

      expect(btn).toBeInTheDocument();

      await user.click(btn);

      expect(props.onClick).toHaveBeenCalledTimes(1);
    });
  });
});
