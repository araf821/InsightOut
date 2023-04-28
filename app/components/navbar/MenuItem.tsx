"use client";

interface ItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<ItemProps> = ({ onClick, label }) => {
  return (
    <div onClick={onClick} className="px-4 py-3 transition font-semibold">
      {label}
    </div>
  );
};
export default MenuItem;
