import ProfilePage from "@/components/page/profile/ProfilePage";
import { singleUserget } from "@/services/AuthService";

const Profile = async () => {
  const res = await singleUserget();
  return (
    <div>
      <ProfilePage userData={res?.data} />
    </div>
  );
};

export default Profile;
