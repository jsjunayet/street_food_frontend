import Posts from "@/components/page/Dashbaord/Posts";
import { getAllcategory } from "@/services/categoryservice";
import { getAllPostForAdmin } from "@/services/postService";

const postApproval = async () => {
  const result = await getAllPostForAdmin();
  const category = await getAllcategory();
  return (
    <div>
      <Posts posts={result?.data} categories={category?.data} />
    </div>
  );
};

export default postApproval;
