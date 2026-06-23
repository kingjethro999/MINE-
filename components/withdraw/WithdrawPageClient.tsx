"use client";

import { useEffect } from "react";
import { useExchangeRate } from "@/components/providers/ExchangeRateProvider";
import WithdrawForm from "@/components/withdraw/WithdrawForm";

interface Props {
  userId: string;
  balanceUsd: number;
  minWithdrawalNgn: number;
  planName: string;
  downlineCount: number;
  minDownlines: number;
  defaultBankCode?: string;
  defaultBankName?: string;
  defaultAccountNumber?: string;
  defaultAccountName?: string;
}

export default function WithdrawPageClient(props: Props) {
  const { refreshRate, rate } = useExchangeRate();

  useEffect(() => {
    refreshRate(true);
  }, [refreshRate]);

  const balanceNgn = rate ? props.balanceUsd * rate : 0;

  return (
    <WithdrawForm
      userId={props.userId}
      coinsBalanceNgn={balanceNgn}
      balanceUsd={props.balanceUsd}
      exchangeRate={rate}
      minWithdrawal={props.minWithdrawalNgn}
      planName={props.planName}
      downlineCount={props.downlineCount}
      minDownlines={props.minDownlines}
      defaultBankCode={props.defaultBankCode}
      defaultBankName={props.defaultBankName}
      defaultAccountNumber={props.defaultAccountNumber}
      defaultAccountName={props.defaultAccountName}
    />
  );
}
