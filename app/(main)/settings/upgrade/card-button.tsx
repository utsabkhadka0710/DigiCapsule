"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EsewaPayment } from "@/actions/payment";

interface CardButtonProps {
  shouldDisableCard: boolean;
  isCurrentPlan: boolean;
  plan: {
    btn: string;
    btnVarient: "outline" | "default";
    priceAmount: number;
  };
}

const CardButton = ({
  shouldDisableCard,
  isCurrentPlan,
  plan,
}: CardButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await EsewaPayment(plan.priceAmount);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      Object.entries(response).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      {shouldDisableCard ? (
        <Button
          disabled
          variant="outline"
          className="w-full font-semibold cursor-not-allowed bg-muted text-muted-foreground"
        >
          {isCurrentPlan ? "Active" : plan.btn}
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          variant={plan.btnVarient}
          className="w-full cursor-pointer font-semibold"
          disabled={loading}
        >
          {loading ? "Processing..." : plan.btn}
        </Button>
      )}
    </>
  );
};

export default CardButton;
