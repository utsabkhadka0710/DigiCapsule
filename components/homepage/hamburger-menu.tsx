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

const HamburgerMenu = ({
  isSheetOpen,
  setIsSheetOpen,
  isPending,
  data,
  renderNavItems,
  loggedInNavItems,
  navItems,
}: HamburgerMenuProps) => {
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
        <div className="absolute right-3 top-3">
          <SheetClose asChild>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </SheetClose>
        </div>
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="mt-7 items-center pt-2 md:hidden">
          <div className="border-b p-4">
            <div className="h-14 w-14 bg-gray-400 rounded-full">Avatar</div>
          </div>

          <ul className="pb-4 mt-4 border-b items-center font-bold text-lg flex flex-col gap-3">
            {isPending
              ? "Loading.."
              : data?.user
                ? renderNavItems(loggedInNavItems)
                : renderNavItems(navItems)}
          </ul>
        </div>
        <div className="flex items-center justify-center">
          {isPending ? null : data?.user ? null : (
            <HamburgerSignupButton setIsSheetOpen={setIsSheetOpen} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default HamburgerMenu;
