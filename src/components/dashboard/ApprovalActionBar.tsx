import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

interface ApprovalActionBarProps {
  onApprove: () => void;
  onReject: () => void;
  isPremium: boolean;
  onTogglePremium: (value: boolean) => void;
}

const ApprovalActionBar: React.FC<ApprovalActionBarProps> = ({
  onApprove,
  onReject,
  isPremium,
  onTogglePremium,
}) => {
  const handleApprove = () => {
    onApprove();
    toast.success("Post approved successfully");
  };

  const handleReject = () => {
    onReject();
    toast.error("Post rejected");
  };

  return (
    <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Switch
          id="premium-mode"
          checked={isPremium}
          onCheckedChange={onTogglePremium}
        />
        <label
          htmlFor="premium-mode"
          className="text-sm font-medium cursor-pointer"
        >
          Mark as Premium Content
        </label>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="sm" onClick={handleReject}>
          <X className="mr-1 h-4 w-4" />
          Reject
        </Button>
        <Button variant="default" size="sm" onClick={handleApprove}>
          <Check className="mr-1 h-4 w-4" />
          Approve
        </Button>
      </div>
    </div>
  );
};

export default ApprovalActionBar;
