"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const PreviewNotice = () => {
  const [isNoticeVisible, setIsNoticeVisible] = useState(false);

  useEffect(() => {
    const storedTime = localStorage.getItem("previewNoticeDismissedTime");

    if (storedTime) {
      const dismissedTime = parseInt(storedTime, 10);

      // Check if 24 hours have passed or not
      if (Date.now() - dismissedTime < 24 * 60 * 60 * 1000) {
        setIsNoticeVisible(false);
      } else {
        setIsNoticeVisible(true);
      }
    } else {
      setIsNoticeVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsNoticeVisible(false);
    localStorage.setItem("previewNoticeDismissedTime", Date.now().toString());
  };

  if (!isNoticeVisible) return null;

  return (
    <div className="max-w-fit flex items-center justify-between px-4 py-2 bg-gray-900 mb-3">
      <p className="text-sm text-red-500 font-semibold">
        You can only preview the capsule within 24 hours of creating it. After
        that, you won&apos;t be able to preview it anymore.
      </p>
      <X className="ml-2 cursor-pointer" size={24} onClick={handleDismiss} />
    </div>
  );
};

export default PreviewNotice;
