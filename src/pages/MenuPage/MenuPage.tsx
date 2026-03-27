import { useMemo, useState } from "react";

import { Food } from "@/types/app";

import BtnCategory from "@/components/BtnCategory/BtnCategory";
import ItemMenu from "@/components/ItemMenu/ItemMenu";

import { getCategories } from "@/helpers/getCategories";

import menu from "@/constants/menu";

import "@/pages/MenuPage/MenuPage.css";

const MenuPage = () => {
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
    <main className="menu-page" aria-label="Food menu">
      <section className="header-wrapper" aria-label="Menu header">
        <article className="header__content">
          <h1 className="header__title">Our Menu</h1>
          <div className="header__separator" role="presentation"></div>
        </article>
      </section>

      <section className="options" aria-label="Category filters">
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

      <section className="items-menu" aria-label="Menu items">
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

export default MenuPage;
