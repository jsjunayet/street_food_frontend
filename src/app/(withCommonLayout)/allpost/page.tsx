import AllPostPage from "@/components/AllPost/AllPostPage";
import { getAllcategory } from "@/services/categoryservice";
import { getAllPost } from "@/services/postService";

const AllProudct = async () => {
  const { data } = await getAllPost();
  const { data: Categories } = await getAllcategory();
  return (
    <div>
      <AllPostPage posts={data} categoriess={Categories} />
    </div>
  );
};

export default AllProudct;
