"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FailurePage = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      router.replace("/settings/upgrade");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <XCircle
          className="text-red-500 mx-auto mb-4"
          size={52}
          strokeWidth={1.5}
        />
        <h1 className="text-2xl font-bold mb-2">Payment Failed</h1>
        <p className="text-text-secondary text-sm mb-6">
          You have not been charged. Redirecting in{" "}
          <span className="text-foreground font-semibold">{countdown}s</span>
        </p>
        <Button
          onClick={() => router.replace("/settings/upgrade")}
          className="text-sm text-text-secondary underline cursor-pointer underline-offset-4"
          variant={"ghost"}
        >
          Go now
        </Button>
      </div>
    </section>
  );
};

export default FailurePage;
