import { cn } from "@/lib/utils";

interface PlanBadgeProps {
  plan: string;
  className?: string;
}

export default function PlanBadge({
  plan,
  className = ""
}: PlanBadgeProps) {
  return (
    <span
      className={cn(
        `text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider plan-badge-${plan.toLowerCase()}`,
        className
      )}
    >
      {plan}
    </span>
  );
}