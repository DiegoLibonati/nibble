// interface DefaultProps {
//   className?: string;
//   children?: React.ReactNode;
// }

export interface BtnCategoryProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  category: string;
}

export interface ItemMenuProps {
  title: string;
  price: number;
  img: string;
  desc: string;
}
