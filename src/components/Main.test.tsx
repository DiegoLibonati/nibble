import { screen, render } from "@testing-library/react";
import user from "@testing-library/user-event";

import { Main } from "@src/components/Main";

import { getCategories } from "@src/helpers/getCategories";

import { mockMenu } from "@tests/jest.constants";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<Main />);

  return {
    container: container,
  };
};

jest.mock("../constants/data.ts", () => ({
  get menu() {
    return mockMenu;
  },
}));

describe("Main.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the title of the APP, also the button there, the button of all the possible categories based on the menu to be rendered and the general foods.", () => {
      renderComponent();

      const titleApp = screen.getByRole("heading", { name: /our menu/i });
      const btnAll = screen.getByRole("button", { name: /all button/i });

      expect(titleApp).toBeInTheDocument();
      expect(btnAll).toBeInTheDocument();

      const categories = getCategories(mockMenu);

      for (let category of categories) {
        const btnCategory = screen.getByRole("button", {
          name: `${category} button`,
        });

        expect(btnCategory).toBeInTheDocument();
      }

      const articles = screen.getAllByRole("article");
      const foodItems = articles.filter((article) =>
        article.classList.contains("item-menu")
      );

      expect(foodItems).toHaveLength(mockMenu.length);
    });

    test("It should render meals from a specific category when the selected category is clicked.", async () => {
      renderComponent();

      const categories = getCategories(mockMenu);
      const category = categories[0];

      const btnCategory = screen.getByRole("button", {
        name: `${category} button`,
      });

      expect(btnCategory).toBeInTheDocument();

      await user.click(btnCategory);

      const categoryFoods = mockMenu.filter(
        (food) => food.category === category
      );

      const articles = screen.getAllByRole("article");
      const foodItems = articles.filter((article) =>
        article.classList.contains("item-menu")
      );

      expect(foodItems).toHaveLength(categoryFoods.length);
    });

    test("It should render all meals when you click on the 'all' category.", async () => {
      renderComponent();

      const btnAll = screen.getByRole("button", {
        name: `all button`,
      });

      expect(btnAll).toBeInTheDocument();

      await user.click(btnAll);

      const articles = screen.getAllByRole("article");
      const foodItems = articles.filter((article) =>
        article.classList.contains("item-menu")
      );

      expect(foodItems).toHaveLength(mockMenu.length);
    });
  });
});
