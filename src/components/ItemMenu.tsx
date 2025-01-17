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
    <article className="item">
      <img src={img} alt={title}></img>

      <div className="item__description">
        <div className="item__description__header">
          <h2>{title}</h2>
          <p>${price}</p>
        </div>

        <p className="item__text">{desc}</p>
      </div>
    </article>
  );
};
