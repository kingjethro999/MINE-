"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function BoostStatusToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const message = searchParams.get("message");

    if (status === "success") {
      toast.success(message === "boost_activated" ? "Boost activated for 24 hours!" : "Payment successful");
    } else if (status === "failed") {
      toast.error("Payment could not be verified");
    } else if (status === "error") {
      toast.error("Something went wrong with your payment");
    }
  }, [searchParams]);

  return null;
}
