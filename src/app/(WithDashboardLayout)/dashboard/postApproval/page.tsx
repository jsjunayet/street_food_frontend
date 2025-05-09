import Posts from "@/components/page/Dashbaord/Posts";
import { getAllPostForAdmin } from "@/services/postService";

const postApproval = async () => {
  const result = await getAllPostForAdmin();
  return (
    <div>
      <Posts allposts={result.data} />
    </div>
  );
};

export default postApproval;
