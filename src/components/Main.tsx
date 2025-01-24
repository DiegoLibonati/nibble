import { useMemo, useState } from "react";

import { Food } from "../entities/entities";

import { ItemMenu } from "./ItemMenu";
import { BtnCategory } from "./BtnCategory";

import { getCategories } from "../helpers/getCategories";
import { menu } from "../constants/data";

export const Main = (): JSX.Element => {
  const [foods, setFoods] = useState<Food[]>(menu);

  const handleSetFoodByCategory = (category: string): void => {
    if (category === "all") return setFoods(menu);

    const newMenu = menu.filter((food) => food.category === category);

    setFoods(newMenu);
  };

  const categories = useMemo(() => {
    return getCategories(menu);
  }, []);

  return (
    <main className="main-app">
      <section className="header">
        <article className="header__content">
          <h1 className="header__content-title">Our Menu</h1>
          <div className="header__content-separator"></div>
        </article>
      </section>

      <section className="options">
        <article className="options__btns">
          <BtnCategory
            category={"all"}
            onClick={() => handleSetFoodByCategory("all")}
          ></BtnCategory>
          {categories.map((category: string) => {
            return (
              <BtnCategory
                key={category}
                category={category}
                onClick={() => handleSetFoodByCategory(category)}
              ></BtnCategory>
            );
          })}
        </article>
      </section>

      <section className="items-menu">
        {foods.map((food) => {
          return (
            <ItemMenu
              key={food.id}
              title={food.title}
              desc={food.desc}
              img={food.img}
              price={food.price}
            ></ItemMenu>
          );
        })}
      </section>
    </main>
  );
};
