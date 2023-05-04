"use client";

interface ItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<ItemProps> = ({ onClick, label }) => {
  return (
    <div onClick={onClick} className="px-4 py-3 transition duration-300 font-semibold
    hover:bg-zinc-800 bg-white hover:text-white">
      {label}
    </div>
  );
};
export default MenuItem;
