import { PackageX } from "lucide-react"; // change here
import { Card } from "../ui/card";

interface NotFoundProductProps {
  title: string;
  details: string;
}

const NotFoundProudct = ({ title, details }: NotFoundProductProps) => {
  return (
    <Card className="flex flex-col py-20 items-center justify-center p-10 text-center text-muted-foreground">
      <PackageX className="w-10 h-10 mb-4 text-gray-400" />{" "}
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm mt-2">{details}</p>
    </Card>
  );
};

export default NotFoundProudct;
