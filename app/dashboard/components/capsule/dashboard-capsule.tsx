"use client";

import { useState } from "react";
import Image from "next/image";
import { CapsuleType } from "@/lib/types/types";
import { IoMdLock } from "react-icons/io";
import { FaClock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { calculateUnlockTime } from "@/lib/helper/calculate-unlock-time";
import Link from "next/link";

const DashboardCapsule = ({ capsule }: { capsule: CapsuleType }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const isLocked = capsule.status === "locked";

  const unlockTime = calculateUnlockTime(capsule.unlockAt);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-900 shadow-lg w-full max-w-sm md:w-80 lg:w-72">
      {/* Image div */}
      <div className="relative h-44 w-full">
        <Image
          src="/blur.png"
          alt={`${capsule.title} hint image`}
          loading="eager"
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className={`object-cover transition ${isLocked ? "brightness-50" : "brightness-90"}`}
          onLoad={() => setIsImageLoaded(true)}
        />

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
            <span>
              <FaClock className="inline-block mr-2" />
              Opens in {unlockTime.message}
            </span>
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <FaCheckCircle className="inline-block mr-2" />
                <span className="text-green-500 font-semibold">
                  Ready to view.
                </span>
              </div>

              <Link href={`#`} className="text-primary font-semibold uppercase">
                Open now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default DashboardCapsule;
