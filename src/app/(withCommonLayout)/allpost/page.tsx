import AllPostPage from "@/components/AllPost/AllPostPage";
import { getAllcategory } from "@/services/categoryservice";
import { getAllPost } from "@/services/postService";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "StreetGrub | AllPost",
  description: "Generated by streetGrub AllPost page",
};
const AllProudct = async () => {
  const { data } = await getAllPost();
  const { data: Categories } = await getAllcategory();
  return (
    <div>
      {/* <AllPosts /> */}
      <AllPostPage posts={data} categoriess={Categories} />
    </div>
  );
};

export default AllProudct;
