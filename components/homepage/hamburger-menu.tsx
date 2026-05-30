"use client";

import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { HamburgerMenuProps } from "@/lib/types/types";
import HamburgerSignupButton from "./hamburger-signup-button";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertBox } from "../ui/shared/alert-box";

const HamburgerMenu = ({
  isSheetOpen,
  setIsSheetOpen,
  session,
  renderNavItems,
  loggedInNavItems,
  navItems,
}: HamburgerMenuProps) => {
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
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 select-none"
          aria-label={isSheetOpen ? "Menu is open" : "Open menu"}
        >
          {isSheetOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </SheetTrigger>
      <SheetContent className="md:hidden select-none" showCloseButton={false}>
        <div className="fixed top-6 right-4 z-50">
          <SheetClose asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2"
              aria-label="Close menu"
            >
              <X size={40} />
            </button>
          </SheetClose>
        </div>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mt-16 items-center pt-2 md:hidden">
          <ul className="pb-4 border-b items-center font-bold text-lg flex flex-col gap-3">
            {session?.user
              ? renderNavItems(loggedInNavItems)
              : renderNavItems(navItems)}
          </ul>
          {session?.user && (
            <div className="pt-4 flex items-center justify-center">
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
              <Button
                onClick={() => setIsLogoutAlertOpen(true)}
                variant="destructive"
                className="text-center py-2 font-bold text-lg cursor-pointer"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center">
          {session?.user ? null : (
            <HamburgerSignupButton setIsSheetOpen={setIsSheetOpen} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default HamburgerMenu;
