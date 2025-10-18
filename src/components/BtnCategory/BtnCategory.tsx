import { BtnCategoryProps } from "@src/entities/props";

import "@src/components/BtnCategory/BtnCategory.css";

export const BtnCategory = ({
  category,
  onClick,
}: BtnCategoryProps): JSX.Element => {
  return (
    <button
      className="btn-category"
      onClick={onClick}
      type="button"
      aria-label={`${category} button`}
    >
      {category}
    </button>
  );
};
