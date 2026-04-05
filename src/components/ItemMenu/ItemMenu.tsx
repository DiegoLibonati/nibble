import type { JSX } from "react";
import type { ItemMenuProps } from "@/types/props";

import "@/components/ItemMenu/ItemMenu.css";

const ItemMenu = ({ title, price, img, desc }: ItemMenuProps): JSX.Element => {
  return (
    <article className="item-menu" aria-label={title}>
      <img src={img} alt={title} className="item-menu__img"></img>

      <div className="item-menu__content">
        <div className="item-menu__header">
          <h2 className="item-menu__title">{title}</h2>
          <p className="item-menu__price" aria-label={`Price: $${price}`}>
            ${price}
          </p>
        </div>

        <p className="item-menu__description">{desc}</p>
      </div>
    </article>
  );
};

export default ItemMenu;
