import Container from "../Container";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <Container>
      <div className="flex flex-row justify-center items-center overflow-x-auto py-4">
        <div className="flex flex-grow justify-center gap-8 md:gap-16 lg:gap-32 xl:gap-40">
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
        </div>
      </div>
    </Container>
  );
};
export default Categories;

export const categories = [];
