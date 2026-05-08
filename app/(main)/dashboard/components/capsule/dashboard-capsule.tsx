"use client";

import { useState } from "react";
import Image from "next/image";
import { CapsuleType } from "@/lib/types/types";
import { IoMdLock } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { calculateUnlockTime } from "@/lib/helper/calculate-unlock-time";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { AlertBox } from "@/components/ui/shared/alert-box";
import { DeleteCapsuleAction } from "@/actions/capsule";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { isPreviewAvailable } from "@/lib/helper/is-preview-available";

const DashboardCapsule = ({ capsule }: { capsule: CapsuleType }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const isLocked = capsule.status === "locked";

  const unlockTime = calculateUnlockTime(capsule.unlockAt);

  const confirmDelete = async () => {
    setIsDeleting(true);

    try {
      const deleteCapsule = await DeleteCapsuleAction(capsule.id);

      if (deleteCapsule.success) {
        toast.success(deleteCapsule.message);
        setOpenAlert(false);
        return;
      }

      toast.error(deleteCapsule.message);
    } catch (error) {
      toast.error("Error deleting capsule.");
      console.error("Error deleting capsule:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-lg">
      {/* Image div */}
      <div className="relative h-44 w-full">
        <Image
          src={capsule.previewImageUrl || "/default.png"}
          alt={`${capsule.title} hint image`}
          loading="eager"
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className={`object-cover transition ${isLocked ? "brightness-50 blur-sm" : "brightness-90"}`}
          onLoad={() => setIsImageLoaded(true)}
        />

        <button
          type="button"
          onClick={() => setOpenAlert(true)}
          className="absolute bg-black/60 h-fit w-fit top-3 left-3 px-1.5 py-1.5 rounded-md border border-white/30 flex items-center cursor-pointer z-10"
          aria-label={`Delete capsule ${capsule.title}`}
        >
          <FaTrash size={18} color="red" className="cursor-pointer" />
        </button>

        {isLocked && (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/55 shadow-lg backdrop-blur-sm">
                <IoMdLock className="text-3xl text-white" />
              </div>
            </div>

            <div className="absolute inset-0 left-0 flex items-start justify-end mt-3 mr-5 bg-black/70 h-fit w-fit ml-auto px-2 py-1 border border-white/30 rounded-sm">
              <p className="text-white text-sm">
                {unlockTime.month} {unlockTime.day}, {unlockTime.year}
              </p>
            </div>
          </>
        )}
      </div>

      {isImageLoaded && <div className="h-px w-full bg-gray-700" />}

      {/* Details div */}
      <div className="p-4">
        <h3 className="truncate text-2xl font-semibold text-gray-100">
          {capsule.title}
        </h3>
        <p className="mt-4 max-w-fit border-2  px-2 py-1 text-xs uppercase text-gray-300 bg-black border-gray-600/80">
          {capsule.category}
        </p>

        <div className="mt-6 text-sm text-gray-500">
          {isLocked ? (
            isPreviewAvailable(capsule.createdAt) ? (
              <div className="flex items-center justify-between">
                <span>
                  <FaClock className="inline-block mr-2" />
                  {unlockTime.message === "soon"
                    ? "Unlocking soon"
                    : `Unlocks in ${unlockTime.message}`}
                </span>

                <Button asChild variant="outline">
                  <Link
                    href={`/preview/${capsule.id}`}
                    className="text-white font-semibold uppercase"
                  >
                    Preview
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between mb-4">
                <span>
                  <FaClock className="inline-block mr-2" />
                  Opens in {unlockTime.message}
                </span>
              </div>
            )
          ) : (
            <div className="flex items-center justify-between mb-4">
              <div>
                <FaCheckCircle className="inline-block mr-2" />
                <span className="text-green-500 font-semibold">
                  Ready to view.
                </span>
              </div>

              <Link
                href={`/capsule/${capsule.id}`}
                className="text-primary font-semibold uppercase"
              >
                Open now
              </Link>
            </div>
          )}
        </div>
      </div>
      <AlertBox
        open={openAlert}
        onOpenChange={setOpenAlert}
        onConfirm={confirmDelete}
        alertTitle="Delete Capsule"
        alertDescription="Are you sure you want to delete this capsule? This action cannot be undone."
        alertActionText="Delete"
        alertCancelText="Cancel"
        actionButtonVarient="destructive"
        isLoading={isDeleting}
        closeOnConfirm={false}
      />
    </div>
  );
};
export default DashboardCapsule;
