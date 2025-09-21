import "@src/components/ItemMenu.css";

interface ItemMenuProps {
  title: string;
  price: number;
  img: string;
  desc: string;
}

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
