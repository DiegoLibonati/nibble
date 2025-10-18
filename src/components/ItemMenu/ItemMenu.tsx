import { ItemMenuProps } from "@src/entities/props";

import "@src/components/ItemMenu/ItemMenu.css";

export const ItemMenu = ({
  title,
  price,
  img,
  desc,
}: ItemMenuProps): JSX.Element => {
  return (
    <article className="item-menu">
      <img src={img} alt={title} className="item-menu__img"></img>

      <div className="item-menu__content">
        <div className="item-menu__header">
          <h2 className="item-menu__title">{title}</h2>
          <p className="item-menu__price">${price}</p>
        </div>

        <p className="item-menu__description">{desc}</p>
      </div>
    </article>
  );
};
