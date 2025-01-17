import { screen, render } from "@testing-library/react";

import { ItemMenu } from "./ItemMenu";

import { mockMenu } from "../tests/jest.constants";

type RenderComponent = {
  props: {
    title: string;
    price: number;
    img: string;
    desc: string;
  };
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const FOOD = mockMenu[0];

  const props = {
    title: FOOD.title,
    price: FOOD.price,
    img: FOOD.img,
    desc: FOOD.desc,
  };

  const { container } = render(
    <ItemMenu
      title={props.title}
      price={props.price}
      desc={props.desc}
      img={props.img}
    />
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

describe("ItemMenu.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the root of the ItemMenu, the image, the title, the price and the description of the food.", () => {
      const { props } = renderComponent();

      const article = screen.getByRole("article");
      const img = screen.getByRole("img");
      const title = screen.getByRole("heading", { name: props.title });
      const price = screen.getByText(`$${props.price}`);
      const description = screen.getByText(props.desc);

      expect(article).toBeInTheDocument();
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", props.img);
      expect(img).toHaveAttribute("alt", props.title);
      expect(title).toBeInTheDocument();
      expect(price).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });
});
