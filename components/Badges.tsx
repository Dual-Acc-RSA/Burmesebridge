import {
  BadgeCheck,
  Crown,
  GraduationCap,
  ShieldCheck,
  Star,
  User,
} from "lucide-react";

type BadgeType =
  | "verified"
  | "moderator"
  | "admin"
  | "teacher"
  | "vip"
  | "member";

export default function Badge({ type }: { type: BadgeType }) {
  const badges = {
    verified: {
      label: "Verified",
      icon: BadgeCheck,
      bg: "#eff6ff",
      color: "#2563eb",
    },
    moderator: {
      label: "Moderator",
      icon: ShieldCheck,
      bg: "#fff7ed",
      color: "#f59e0b",
    },
    admin: {
      label: "Admin",
      icon: Crown,
      bg: "#fef2f2",
      color: "#dc2626",
    },
    teacher: {
      label: "Teacher",
      icon: GraduationCap,
      bg: "#f5f3ff",
      color: "#7c3aed",
    },
    vip: {
      label: "VIP",
      icon: Star,
      bg: "#fff7ed",
      color: "#ea580c",
    },
    member: {
      label: "Member",
      icon: User,
      bg: "#f8fafc",
      color: "#64748b",
    },
  };

  const badge = badges[type] || badges.member;
  const Icon = badge.icon;

  return (
    <span className="badgeTooltipWrap">
      <span
        className="badgeIconGlow"
        aria-label={badge.label}
        style={{
          background: badge.bg,
          color: badge.color,
          boxShadow: `0 0 14px ${badge.color}55`,
        }}
      >
        <Icon size={16} strokeWidth={2.4} />
      </span>

      <span className="badgeTooltip">{badge.label}</span>
    </span>
  );
}