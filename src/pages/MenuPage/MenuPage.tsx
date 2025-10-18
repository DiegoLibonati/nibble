import { useMemo, useState } from "react";

import { Food } from "@src/entities/app";

import { BtnCategory } from "@src/components/BtnCategory/BtnCategory";
import { ItemMenu } from "@src/components/ItemMenu/ItemMenu";

import { getCategories } from "@src/helpers/getCategories";

import menu from "@src/constants/menu";

import "@src/pages/MenuPage/MenuPage.css";

export const MenuPage = () => {
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
    <main className="menu-page">
      <section className="header-wrapper">
        <article className="header__content">
          <h1 className="header__title">Our Menu</h1>
          <div className="header__separator"></div>
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
