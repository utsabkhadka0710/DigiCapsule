"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  alertTitle?: string;
  alertDescription: string;
  alertActionText: string;
  alertCancelText: string;
  actionButtonVariant?: "default" | "destructive";
  isLoading?: boolean;
  closeOnConfirm?: boolean;
  otherInfo?: string;
  actionDelaySeconds?: number;
}

export function AlertBox({
  open,
  onOpenChange,
  onConfirm,
  alertTitle,
  alertDescription,
  alertActionText,
  alertCancelText,
  actionButtonVariant,
  isLoading = false,
  closeOnConfirm = true,
  otherInfo,
  actionDelaySeconds = 0,
}: Props) {
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!open || isLoading || actionDelaySeconds <= 0) {
      setCountdown(0);
      return;
    }

    setCountdown(actionDelaySeconds);

    const interval = window.setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          window.clearInterval(interval);
          return 0;
        }

        return prevCountdown - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [open, isLoading, actionDelaySeconds]);

  const isActionLocked = countdown > 0;

  return (
    <AlertDialog
      open={open}
      onOpenChange={(newOpen) => !isLoading && onOpenChange(newOpen)}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        {otherInfo && (
          <p className="text-sm text-red-500 font-normal">{otherInfo}</p>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>
            {alertCancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              if (isActionLocked) {
                event.preventDefault();
                return;
              }

              if (!closeOnConfirm) {
                event.preventDefault();
              }

              onConfirm();
            }}
            className="cursor-pointer"
            variant={actionButtonVariant}
            disabled={isLoading || isActionLocked}
          >
            {isLoading ? (
              <Spinner />
            ) : isActionLocked ? (
              `${alertActionText} (${countdown}s)`
            ) : (
              alertActionText
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
