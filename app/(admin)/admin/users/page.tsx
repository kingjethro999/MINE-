import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Users, Trash2 } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Auth verify
  const currentUser = await prisma.user.findUnique({ where: { id: session.user.id }});
  if (!currentUser?.isAdmin) redirect("/dashboard");

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 100
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Users size={28} className="text-[var(--gold-400)]" /> Manage Users
        </h1>
        <p className="text-[var(--text-secondary)]">View and manage platform members.</p>
      </header>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl overflow-hidden mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="bg-[var(--surface-900)] text-[var(--text-muted)] uppercase tracking-wider text-xs border-b border-[var(--surface-600)]">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Balance</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--surface-600)]">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--surface-700)] transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{user.name} {user.isAdmin && "(Admin)"}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider plan-badge-${user.plan.toLowerCase()}`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono font-semibold text-[var(--gold-400)]">₦{user.coinsBalance.toFixed(2)}</td>
                  <td className="px-6 py-4">{user.createdAt.toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-[var(--color-danger)] hover:text-white transition-colors">
                      <Trash2 size={16} />
                    </button>
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
