import PremiumPage from "@/components/premium/premiumPage";
import { getCurrentUser, subscription } from "@/services/AuthService";

const Premium = async () => {
  const user = await getCurrentUser();
  const payment = await subscription();
  return (
    <div>
      <PremiumPage user={user} payment={payment.data} />
    </div>
  );
};

export default Premium;
