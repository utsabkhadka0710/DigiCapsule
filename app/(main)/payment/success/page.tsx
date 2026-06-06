"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { VerifyEsewaPayment } from "@/actions/payment";

const SuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasVerifiedRef = useRef(false);

  const data = searchParams.get("data");

  useEffect(() => {
    if (hasVerifiedRef.current) {
      return;
    }

    hasVerifiedRef.current = true;

    if (!data) {
      router.replace("/payment/failure");
      return;
    }

    const verifyPayment = async () => {
      const isPaymentSuccess = (await VerifyEsewaPayment(data)) as boolean;

      if (isPaymentSuccess) {
        router.replace(process.env.RETURN_URL_AFTER_PAYMENT || "/plans");
        return;
      }

      router.replace("/payment/failure");
    };

    verifyPayment();
  }, [router, data]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        <CheckCircle2
          className="text-primary mx-auto mb-4"
          size={52}
          strokeWidth={1.5}
        />
        <h1 className="text-2xl font-bold mb-2">Payment Successful</h1>
        <p className="text-text-secondary text-sm">Redirecting..</p>
      </div>
    </section>
  );
};

export default SuccessPage;
