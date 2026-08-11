import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Shield size={14} />
            Data Protection
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Privacy Policy</h1>
         <p className="text-lg text-[var(--text-secondary)]">How we collect, use, and protect your personal information.</p>
      </div>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed text-sm bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 md:p-12 rounded-[32px]">
         <section>
            <h3 className="text-xl font-bold text-white mb-3">Information We Collect</h3>
            <p>
               When you register and use the platform, we collect information you provide directly, including your email address, account credentials, and any profile details you choose to add. To process withdrawals, we collect the bank account details you provide for payouts. We also automatically collect limited technical information such as your device type, browser, and IP address to operate and secure the service.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">How We Use Your Information</h3>
            <p>
               We use your information to:
               <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Create and manage your account, plans, and earnings.</li>
                  <li>Process plan payments and withdrawals to your bank account.</li>
                  <li>Track referrals made through your unique referral link.</li>
                  <li>Prevent fraud, multi-accounting, and abuse of the platform.</li>
                  <li>Send service updates and respond to your support requests.</li>
               </ul>
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">Third-Party Services</h3>
            <p>
               We share limited data with trusted service providers who help us operate the platform, including payment processing, bank account verification, hosting, and analytics. Your bank details are passed to our payment provider solely to complete withdrawals and are never used for marketing. We do not sell, rent, or trade your personal information to any third party.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">Data Security</h3>
            <p>
               We apply reasonable technical and organisational measures to protect your data, including encryption in transit and at rest. Passwords are stored in hashed form, and we never store your bank account details in plaintext. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">Data Retention &amp; Your Rights</h3>
            <p>
               We retain your information for as long as your account is active or as needed to provide the service, comply with legal obligations, resolve disputes, and enforce our agreements. You may request access to, correction of, or deletion of your personal data by contacting our support team. Deleting your account does not remove information we are legally required to keep.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">Cookies</h3>
            <p>
               We use essential cookies and similar technologies to keep you signed in and to remember your preferences. These are required for the platform to function. We do not use cookies to build advertising profiles of you.
            </p>
         </section>
      </div>
    </div>
  );
}
