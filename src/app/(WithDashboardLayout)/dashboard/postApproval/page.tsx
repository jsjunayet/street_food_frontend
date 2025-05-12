import Posts from "@/components/page/Dashbaord/Posts";
import { getAllcategory } from "@/services/categoryservice";
import { getAllPostForAdmin } from "@/services/postService";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: " StreetGrub | Dashboard - Post Approval",
  description:
    "Manage and approve submitted posts from users on the StreetGrub dashboard.",
};

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
