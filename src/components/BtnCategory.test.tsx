import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { BtnCategory } from "./BtnCategory";

import { MENU_MOCK } from "../tests/constants/constants";

type RenderComponent = {
  props: {
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    category: string;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const FOOD = MENU_MOCK[0];

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

test("It should render a button with the category name and execute onClick fn when executed.", async () => {
  const { props } = renderComponent();

  const btn = screen.getByRole("button", { name: `${props.category} button` });

  expect(btn).toBeInTheDocument();

  await user.click(btn);

  expect(props.onClick).toHaveBeenCalledTimes(1);
});
