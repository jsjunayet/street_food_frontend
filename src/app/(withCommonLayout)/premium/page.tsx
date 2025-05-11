import PremiumPage from "@/components/premium/premiumPage";
import { subscription } from "@/services/AuthService";

const Premium = async () => {
  const payment = await subscription();
  return (
    <div>
      <PremiumPage payment={payment.data} />
    </div>
  );
};

export default Premium;
