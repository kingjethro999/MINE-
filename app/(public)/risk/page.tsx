import { AlertTriangle } from "lucide-react";

export default function RiskDisclaimerPage() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
         <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
               <AlertTriangle size={14} />
               Important Notice
            </div>
            <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Risk Disclaimer</h1>
            <p className="text-lg text-[var(--text-secondary)]">Please read this notice carefully before using the platform.</p>
         </div>

         <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed text-sm">
            <section>
               <h3 className="text-xl font-bold text-white mb-3">1. Earnings Are Not Guaranteed</h3>
               <p className="mb-4">
                  Rewards earned on Mines are payments for completing activities such as watching videos and playing games. They are not an investment return, salary, or guaranteed income. Your actual earnings depend on your plan, the number of activities you complete, platform availability, and your adherence to these terms. Nothing on the platform is a promise of a specific income.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">2. Reward Rates May Change</h3>
               <p className="mb-4">
                  The value of each completed video and each minute of gameplay is set by the platform and may be reviewed and adjusted at any time. Exchange rates used to convert USD rewards to Naira may also fluctuate. Rewards shown on the platform are estimates at the time of display and are finalised at the rates in effect when a withdrawal is processed.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">3. Withdrawal Scheduling</h3>
               <p className="mb-4">
                  Withdrawals are only processed on your plan&apos;s designated withdrawal days and may be subject to a minimum threshold. Payouts are sent to your linked Nigerian bank account and, depending on your plan, can take several business days to arrive. Delays caused by your bank or our payment provider are outside our control.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">4. Referral Requirements</h3>
               <p className="mb-4">
                  Starter and Advanced plans must maintain the minimum number of active referrals required to withdraw. If you do not meet the referral requirement for your plan, your pending withdrawals will be held until the requirement is satisfied. Elite plan members are exempt from this requirement.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">5. Account Misuse</h3>
               <p className="mb-4">
                  Using bots, scripts, multiple accounts, or any automated method to generate rewards is prohibited. If we detect such activity, we may void the rewards in question, suspend your withdrawals, or close your account. Rewards forfeited in these circumstances will not be reinstated.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">6. Not a Financial Product</h3>
               <p className="mb-4">
                  Mines is an entertainment and rewards platform. It is not a bank, investment vehicle, or financial advisory service. Plan fees and rewards are for platform access and activity completion and should not be treated as savings or an investment. You are solely responsible for how you spend your money on the platform.
               </p>
            </section>

            <div className="p-6 mt-8 rounded-2xl bg-[var(--surface-900)] border border-[var(--border)] italic">
               By creating an account and using Mines, you acknowledge that you have read this disclaimer and accept these risks. The platform does not guarantee any minimum or maximum earnings, and you agree not to hold the platform liable for lost earnings arising from policy changes, account suspension, or activity adjustments.
            </div>
         </div>
      </div>
   );
}
