import Comments from "@/components/page/Dashbaord/Comments";
import { getComments } from "@/services/commentservice";

const Comment = async () => {
  const comments = await getComments();
  console.log(comments);
  return (
    <div>
      <Comments Postcomments={comments?.data} />
    </div>
  );
};

export default Comment;
