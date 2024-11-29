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
      onClick={onClick}
      type="button"
      aria-label={`${category} button`}
    >
      {category}
    </button>
  );
};
