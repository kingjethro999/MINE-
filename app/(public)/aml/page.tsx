import { Search } from "lucide-react";

export default function AMLPolicyPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
            <Search size={14} />
            Compliance Policy
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Anti-Money Laundering Policy</h1>
         <p className="text-lg text-[var(--text-secondary)]">Our commitment to preventing money laundering and financial fraud.</p>
      </div>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 md:p-12 rounded-[32px]">
         <div className="prose prose-invert max-w-none text-sm text-[var(--text-secondary)]">
            <h3 className="text-xl font-bold text-white mb-4">Our Commitment</h3>
            <p className="mb-6">
               Mines is committed to operating with integrity and to complying with applicable anti-money laundering (AML) regulations. We take reasonable steps to ensure the platform is not used to launder money, fund illegal activity, or process payments derived from criminal conduct. We cooperate with the relevant Nigerian authorities in the investigation of financial crime.
            </p>

            <h3 className="text-xl font-bold text-white mb-4">Identity Verification for Withdrawals</h3>
            <p className="mb-6">
               To withdraw earnings, you must link a valid Nigerian bank account in your own name. We verify withdrawal accounts and may require additional identity verification before processing payouts. This may include a valid government-issued identification document. Withdrawals will not be processed until verification is completed.
            </p>

            <h3 className="text-xl font-bold text-white mb-4">Monitoring and Detection</h3>
            <p className="mb-6">
               We monitor accounts and payout activity for signs of suspicious behaviour, including multiple accounts linked to the same person, unusual withdrawal patterns, and attempts to move funds through accounts that do not match the registered user. We also screen against relevant sanction lists and report activity we reasonably suspect to be money laundering or fraud.
            </p>

            <h3 className="text-xl font-bold text-white mb-4">Freezing and Withholding</h3>
            <p className="mb-6">
               Where suspicious activity is identified, we may freeze an account and withhold pending withdrawals while we investigate. If an account is found to be involved in money laundering or fraud, we will close the account, forfeit the affected balance, and report the matter to the appropriate authorities without notice to the user.
            </p>

            <h3 className="text-xl font-bold text-white mb-4">Your Responsibility</h3>
            <p className="mb-6">
               You agree to provide accurate information, to use only your own bank accounts for withdrawals, and to notify us of any changes to your details. Assisting others in moving funds through the platform, or using third-party accounts to receive payouts, is a violation of this policy and will lead to account closure.
            </p>

            <div className="p-4 mt-6 bg-[var(--color-accent)]/5 border-l-2 border-[var(--color-accent)]">
               <p className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-widest">Strict enforcement keeps the platform safe for everyone. Suspicious activity will be reported.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
