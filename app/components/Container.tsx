"use client";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1536px] px-4 sm:px-6 md:px-10 xl:px-20">
      {children}
    </div>
  );
};
export default Container;
