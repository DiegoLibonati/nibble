import "./ItemMenu.css";

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

      <div className="item-menu__description">
        <div className="item__description-header">
          <h2 className="item__description-header-title">{title}</h2>
          <p className="item__description-header-price">${price}</p>
        </div>

        <p className="item-menu__description-text">{desc}</p>
      </div>
    </article>
  );
};
