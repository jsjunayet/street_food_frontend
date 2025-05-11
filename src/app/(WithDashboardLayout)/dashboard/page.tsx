import Dashboard from "@/components/page/Dashbaord/Dashboard";
import { getAllPostForAdmin } from "@/services/postService";

const Dashbaord = async () => {
  const res = await getAllPostForAdmin();
  return (
    <div>
      <Dashboard posts={res.data} />
    </div>
  );
};

export default Dashbaord;
