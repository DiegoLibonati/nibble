import { BtnCategoryProps } from "@/types/props";

import "@/components/BtnCategory/BtnCategory.css";

const BtnCategory = ({ category, onClick }: BtnCategoryProps) => {
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

export default BtnCategory;
