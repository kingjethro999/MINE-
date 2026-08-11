import { FileSignature } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
            <FileSignature size={14} />
            Legal Binding Agreement
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Terms of Service</h1>
         <p className="text-lg text-[var(--text-secondary)]">Effective Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed text-sm bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 md:p-12 rounded-[32px]">
         <section>
            <h3 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h3>
            <p>
               By creating an account on Mines, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, you must not use the platform. We may update these terms from time to time, and continued use of the platform after changes take effect constitutes acceptance of the updated terms.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">2. Account Registration</h3>
            <p>
               You must register with accurate and complete information, including a valid email address. You are responsible for safeguarding your account credentials and for all activity that occurs under your account. Only one account per person is permitted, and creating multiple accounts is a violation of these terms.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">3. Subscription Plans &amp; Payments</h3>
            <p>
               Access to earning features requires selecting a plan — Starter, Advanced, or Elite. Plan fees are paid in Naira (NGN) through our payment provider and are non-refundable, except where required by law. By upgrading, you pay only the difference between your current plan and the new plan. Plan changes do not reset your earned balance or video limits for the current day.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">4. Earnings</h3>
            <p>
               You earn rewards by completing activities on the platform, including watching videos and playing games. Video rewards are paid per completed video (between $2 and $5 depending on your plan), subject to a daily video limit. Game rewards accrue per minute of active gameplay. All rewards are estimates displayed in USD and converted to Naira at the current platform rate at the time of withdrawal. Rewards may be adjusted or withheld if activity is determined to be fraudulent or in violation of these terms.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">5. Withdrawals</h3>
            <p>
               Earnings can be withdrawn to a Nigerian bank account in Naira. Withdrawals are processed only on your plan&apos;s designated withdrawal days, with a minimum withdrawal threshold that may apply. Withdrawal requests are paid to the verified bank account linked to your account and may take several business days to arrive, depending on your plan. Withdrawals are subject to a 0% platform fee, but bank or payment provider charges may still apply.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">6. Referral Requirements</h3>
            <p>
               Starter and Advanced plans require a minimum number of active referrals before withdrawals can be processed, as set out on the platform. Referrals are counted when the referred user registers through your unique referral link and remains an active account. Elite plan members are exempt from this requirement. Attempting to inflate your referral count with fake or inactive accounts is a breach of these terms.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">7. Acceptable Use</h3>
            <p>
               You agree not to use bots, scripts, macros, or automated tools to complete videos or games, create multiple accounts to farm rewards, exploit bugs or glitches, or engage in any activity that manipulates earnings. The platform monitors for such behaviour, and any rewards generated through prohibited means may be forfeited.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">8. Modifications to the Service</h3>
            <p>
               We reserve the right to modify, suspend, or discontinue any part of the platform, including reward rates, video limits, withdrawal schedules, and referral requirements, at any time. Changes affecting reward rates will be communicated to users and will apply to activity after the change takes effect.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">9. Termination</h3>
            <p>
               We may suspend or terminate accounts that violate these terms, including for multi-accounting, automation abuse, or fraudulent activity. Upon termination for breach, any pending earnings may be forfeited. You may stop using the platform at any time, and you remain responsible for the obligations you have already incurred.
            </p>
         </section>
      </div>
    </div>
  );
}
