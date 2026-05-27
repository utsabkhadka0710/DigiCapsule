"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdLogout } from "react-icons/md";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertBox } from "@/components/ui/shared/alert-box";

interface ProfileDropdownProps {
  email: string;
  image: string;
}

export function DropdownMenuIcons({ email, image }: ProfileDropdownProps) {
  const router = useRouter();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);

  const handleLogout = async function () {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/");
          router.refresh();
        },
      },
    });
  };

  return (
    <DropdownMenu>
      <AlertBox
        open={isLogoutAlertOpen}
        onOpenChange={setIsLogoutAlertOpen}
        onConfirm={handleLogout}
        alertTitle="Log out?"
        alertDescription="You will need to sign in again to access your account."
        alertActionText="Logout"
        alertCancelText="Cancel"
        actionButtonVariant="destructive"
      />
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>PP</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-sm text-gray-100 pt-1">
          <p>{email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="pl-2 cursor-pointer" asChild>
          <button
            type="button"
            onClick={() => setIsLogoutAlertOpen(true)}
            className="font-semibold"
          >
            <MdLogout color="red" />
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
