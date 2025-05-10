import Posts from "@/components/page/Dashbaord/Posts";
import { getComments } from "@/services/commentservice";
import { getAllPostForAdmin } from "@/services/postService";

const postApproval = async () => {
  const result = await getAllPostForAdmin();
  const res = await getComments();
  return (
    <div>
      <Posts allposts={result.data} comment={res?.data} />
    </div>
  );
};

export default postApproval;
