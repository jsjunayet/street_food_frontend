import Users from "@/components/page/Dashbaord/Users";
import { getAllusers } from "@/services/userService";

const User = async () => {
  const result = await getAllusers();
  return (
    <div>
      <Users users={result?.data} />
    </div>
  );
};

export default User;
