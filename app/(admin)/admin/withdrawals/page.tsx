import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { CreditCard, CheckCircle, XCircle } from "lucide-react";

export default async function AdminWithdrawalsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Auth verify
  const currentUser = await prisma.user.findUnique({ where: { id: session.user.id }});
  if (!currentUser?.isAdmin) redirect("/dashboard");

  const requests = await prisma.withdrawal.findMany({
    orderBy: { requestedAt: "desc" },
    include: { user: true },
    take: 50
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <CreditCard size={28} className="text-[var(--gold-400)]" /> Manage Withdrawals
        </h1>
        <p className="text-[var(--text-secondary)]">Process payout requests.</p>
      </header>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="bg-[var(--surface-900)] text-[var(--text-muted)] uppercase tracking-wider text-xs border-b border-[var(--surface-600)]">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Bank Details</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--surface-600)]">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-[var(--surface-700)] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{req.user.name}</td>
                  <td className="px-6 py-4 font-mono font-semibold text-[var(--gold-400)]">₦{req.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <p className="text-white text-xs">{req.bankName}</p>
                    <p className="font-mono text-xs">{req.accountNumber}</p>
                    <p className="text-xs">{req.accountName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider ${
                      req.status === "PENDING" ? "bg-[var(--surface-600)] text-white" :
                      req.status === "APPROVED" ? "bg-[var(--gold-600)] text-black" :
                      req.status === "DISBURSED" ? "bg-[var(--green-600)] text-white" :
                      "bg-[var(--color-danger)] text-white"
                    }`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    {req.status === "PENDING" && (
                      <>
                        <button className="p-1.5 bg-[var(--green-600)] hover:bg-[var(--green-500)] text-white rounded transition-colors" title="Approve">
                          <CheckCircle size={16} />
                        </button>
                        <button className="p-1.5 bg-[var(--color-danger)] hover:bg-red-400 text-white rounded transition-colors" title="Reject">
                          <XCircle size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
