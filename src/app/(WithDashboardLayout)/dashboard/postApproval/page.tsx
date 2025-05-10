import Posts from "@/components/page/Dashbaord/Posts";
import { getAllcategory } from "@/services/categoryservice";
import { getComments } from "@/services/commentservice";
import { getAllPostForAdmin } from "@/services/postService";

const postApproval = async () => {
  const result = await getAllPostForAdmin();
  const res = await getComments();
  const category = await getAllcategory();
  return (
    <div>
      <Posts
        allposts={result.data}
        comment={res?.data}
        categories={category.data}
      />
    </div>
  );
};

export default postApproval;
