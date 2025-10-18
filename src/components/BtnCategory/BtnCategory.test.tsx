import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { BtnCategoryProps } from "@src/entities/props";

import { BtnCategory } from "@src/components/BtnCategory/BtnCategory";

import { mockMenu } from "@tests/jest.constants";

type RenderComponent = {
  props: { onClick: jest.Mock } & BtnCategoryProps;
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

jest.mock("@src/constants/menu", () => {
  const { mockMenu } = jest.requireActual("@tests/jest.constants");
  return { __esModule: true, default: mockMenu };
});

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
