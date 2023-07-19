"use client";

interface CardsContainerProps {
  children: React.ReactNode;
  className?: string;
}

const CardsContainer: React.FC<CardsContainerProps> = ({ children, className }) => {
  return (
    <div
      className={`my-4 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {children}
    </div>
  );
};
export default CardsContainer;
