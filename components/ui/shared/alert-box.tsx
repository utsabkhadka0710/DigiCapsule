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
  actionButtonVarient?: "default" | "destructive";
  isLoading?: boolean;
  closeOnConfirm?: boolean;
}

export function AlertBox({
  open,
  onOpenChange,
  onConfirm,
  alertTitle,
  alertDescription,
  alertActionText,
  alertCancelText,
  actionButtonVarient,
  isLoading = false,
  closeOnConfirm = true,
}: Props) {
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
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isLoading}>
            {alertCancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              if (!closeOnConfirm) {
                event.preventDefault();
              }

              onConfirm();
            }}
            className="cursor-pointer"
            variant={actionButtonVarient}
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : alertActionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
