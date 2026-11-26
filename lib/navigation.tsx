import {
  ClipboardList,
  FilePlus2,
  Gavel,
  Inbox,
  LayoutDashboard,
  Building2,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import type { ReactNode } from "react";

export type NavItem = { href: string; label: string; icon: ReactNode };
export type NavGroup = { title: string; items: NavItem[] };

const icon = (Icon: typeof Inbox) => <Icon size={18} strokeWidth={1.9} />;

export const navGroups: NavGroup[] = [
  {
    title: "ภาพรวม",
    items: [
      { href: "/dashboard", label: "แดชบอร์ด", icon: icon(LayoutDashboard) },
      { href: "/reports/new", label: "รายงานเหตุการณ์", icon: icon(FilePlus2) },
    ],
  },
  {
    title: "จัดการเรื่อง",
    items: [
      { href: "/reports", label: "เรื่องทั้งหมด", icon: icon(ClipboardList) },
      { href: "/inbox", label: "งานรอดำเนินการ", icon: icon(Inbox) },
      { href: "/committee", label: "วาระคณะกรรมการ", icon: icon(Gavel) },
    ],
  },
  {
    title: "ผู้ดูแลระบบ",
    items: [
      { href: "/admin/users", label: "ผู้ใช้งาน", icon: icon(Users) },
      { href: "/admin/departments", label: "หน่วยงาน", icon: icon(Building2) },
      { href: "/admin/settings", label: "เกณฑ์ความเสี่ยง", icon: icon(SlidersHorizontal) },
    ],
  },
];

const allItems = navGroups.flatMap((g) => g.items);

/** หาเมนูที่ตรงกับ path ปัจจุบันมากที่สุด (เช่น /reports/new ชนะ /reports) */
export function matchNav(pathname: string): NavItem | undefined {
  return allItems
    .filter((i) => pathname === i.href || pathname.startsWith(i.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0];
}
