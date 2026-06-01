"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { AlertBox } from "@/components/ui/shared/alert-box";
import { Button } from "@/components/ui/button";

export function DeleteAccountAlert() {
  const [open, setOpen] = useState(false);

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
        onConfirm={() => setOpen(false)}
        alertTitle="Delete your account?"
        alertDescription="This action cannot be undone. Your profile, capsules, and account data will be permanently deleted."
        alertActionText="Delete account"
        alertCancelText="Cancel"
        actionButtonVariant="destructive"
        actionDelaySeconds={7}
      />
    </>
  );
}
