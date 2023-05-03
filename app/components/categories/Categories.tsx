import Container from "../Container";
import CategoryItem from "./CategoryItem";

const Categories = () => {
  return (
    <Container>
      <div className="flex flex-row justify-center items-center overflow-x-auto py-4">
        <div className="flex flex-grow justify-around gap-8 md:gap-12">
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
          <CategoryItem />
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
