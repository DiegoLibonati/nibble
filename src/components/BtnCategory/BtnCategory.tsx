import type { JSX } from "react";
import type { BtnCategoryProps } from "@/types/props";

import "@/components/BtnCategory/BtnCategory.css";

const BtnCategory = ({ category, onClick }: BtnCategoryProps): JSX.Element => {
  return (
    <button
      className="btn-category"
      onClick={onClick}
      type="button"
      aria-label={category === "all" ? "Show all menu items" : `Filter menu by ${category}`}
    >
      {category}
    </button>
  );
};

export default BtnCategory;
