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
  name: string;
  image?: string | null;
}

export function DropdownMenuIcons({
  email,
  name,
  image,
}: ProfileDropdownProps) {
  const router = useRouter();
  const [isLogoutAlertOpen, setIsLogoutAlertOpen] = useState(false);
  const nameLetter =
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("") ||
    email[0]?.toUpperCase() ||
    "U";

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
          {image ? <AvatarImage src={image} alt={name} /> : null}
          <AvatarFallback>{nameLetter}</AvatarFallback>
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
