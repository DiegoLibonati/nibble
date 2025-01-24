import "./BtnCategory.css";

interface BtnCategoryProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  category: string;
}

export const BtnCategory = ({
  onClick,
  category,
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
