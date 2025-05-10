import Categories from "@/components/page/Dashbaord/Categories";
import { getAllcategory } from "@/services/categoryservice";

const Category = async () => {
  const result = await getAllcategory();
  return (
    <div>
      <Categories Foodcatagories={result?.data} />
    </div>
  );
};

export default Category;
