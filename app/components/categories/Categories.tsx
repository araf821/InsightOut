import Container from "../Container";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <section className="flex justify-center items-center max-w-[1425px] mx-auto xl:px-20 pt-4">
      <div className="flex flex-row gap-8 overflow-auto px-4 lg:gap-12 xl:gap-16">
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </div>
    </section>
  );
};

export default Categories;

export const categories = [];
