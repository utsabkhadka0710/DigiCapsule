"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { AlertBox } from "@/components/ui/shared/alert-box";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const DeleteAccountAlert = () => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const confirmDelete = async () => {
    setIsDeleting(true);

    try {
      await authClient.deleteUser();
      router.replace("/");
    } catch {
      setIsDeleting(false);
      toast.error("Failed to delete account. Please try again.");

      return;
    }
  };

  return (
    <>
      <Button
        variant="destructive"
        className="w-fit cursor-pointer "
        onClick={() => setOpen(true)}
      >
        <Trash2 size={16} />
        Delete account
      </Button>

      <AlertBox
        open={open}
        onOpenChange={setOpen}
        onConfirm={confirmDelete}
        alertTitle="Delete your account?"
        alertDescription="This action cannot be undone. Your profile, capsules, and account data will be permanently deleted."
        alertActionText="Delete account"
        alertCancelText="Cancel"
        actionButtonVariant="destructive"
        actionDelaySeconds={7}
        isLoading={isDeleting}
      />
    </>
  );
};
