"use client";

import { Avatar, Badge, Button, Dropdown, Layout, Menu, Tooltip } from "antd";
import type { MenuProps } from "antd";
import { Bell, ChevronDown, FilePlus2, LogOut, Menu as MenuIcon, Siren, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { matchNav, navGroups } from "@/lib/navigation";

const { Header, Sider, Content } = Layout;

const SIDER_WIDTH = 256;
const SIDER_COLLAPSED_WIDTH = 76; // ย่อเหลือเฉพาะไอคอน ไม่ซ่อนทั้งหมด
const STORAGE_KEY = "medup.sider.collapsed";

const toMenuItem = (item: (typeof navGroups)[number]["items"][number]) => ({
  key: item.href,
  icon: item.icon,
  label: <Link href={item.href}>{item.label}</Link>,
});

// ขยาย: แสดงชื่อกลุ่ม / ย่อ: เหลือไอคอนคั่นด้วยเส้น (ชื่อกลุ่มจะถูกตัดถ้าแสดงในความกว้าง 76px)
const expandedItems: MenuProps["items"] = navGroups.map((group) => ({
  type: "group",
  key: group.title,
  label: group.title,
  children: group.items.map(toMenuItem),
}));

const collapsedItems: MenuProps["items"] = navGroups.flatMap((group, i) => [
  ...(i > 0 ? [{ type: "divider" as const, key: `d-${group.title}`, className: "mx-4! my-2!" }] : []),
  ...group.items.map(toMenuItem),
]);

const userMenu: MenuProps["items"] = [
  { key: "profile", icon: <UserRound size={16} />, label: "ข้อมูลส่วนตัว" },
  { type: "divider" },
  { key: "logout", icon: <LogOut size={16} />, label: "ออกจากระบบ", danger: true },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const current = matchNav(pathname);
  const [collapsed, setCollapsed] = useState(false);

  // จำสถานะ sidebar ของผู้ใช้แต่ละคนไว้ในเบราว์เซอร์
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") setCollapsed(true);
    } catch {}
  }, []);

  const toggle = () => {
    setCollapsed((prev) => {
      try {
        localStorage.setItem(STORAGE_KEY, prev ? "0" : "1");
      } catch {}
      return !prev;
    });
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={SIDER_WIDTH}
        collapsedWidth={SIDER_COLLAPSED_WIDTH}
        collapsible
        collapsed={collapsed}
        trigger={null}
        breakpoint="lg"
        onBreakpoint={(broken) => broken && setCollapsed(true)}
        className="sticky! top-0 h-dvh! overflow-y-auto border-r border-line"
        style={{ background: "linear-gradient(180deg, #F4EFFC 0%, #F1F5F3 60%, #EAF6EF 100%)" }}
      >
        <div className="flex h-full flex-col">
          <Link
            href="/dashboard"
            className={`flex h-16 shrink-0 items-center gap-3 border-b border-line ${collapsed ? "justify-center px-0" : "px-5"}`}
          >
            <Image src="/logo.png" alt="โลโก้คณะแพทยศาสตร์ มหาวิทยาลัยพะเยา" width={40} height={40} priority />
            {!collapsed && (
              <div className="min-w-0 leading-tight">
                <div className="text-[15px] font-bold tracking-wide text-purple-deep">MEDUP Risk</div>
                <div className="truncate text-xs text-ink-muted">ความเสี่ยงด้านการศึกษา</div>
              </div>
            )}
          </Link>

          <Menu
            mode="inline"
            items={collapsed ? collapsedItems : expandedItems}
            selectedKeys={current ? [current.href] : []}
            className="mt-2 flex-1 border-none! bg-transparent!"
          />

          {/* หมายเหตุจาก flowchart: เหตุเร่งด่วน */}
          <div className="p-3">
            {collapsed ? (
              <Tooltip placement="right" title="เหตุเร่งด่วน: ช่วยเหลือและแจ้งผู้รับผิดชอบทันที">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/70 text-[#B4232C]">
                  <Siren size={18} />
                </div>
              </Tooltip>
            ) : (
              <div className="rounded-xl border border-[#F3C9CC] bg-white/70 p-3 text-xs leading-relaxed text-ink-muted">
                <div className="mb-1 flex items-center gap-1.5 font-semibold text-[#B4232C]">
                  <Siren size={14} /> เหตุเร่งด่วน
                </div>
                ช่วยเหลือและแจ้งผู้รับผิดชอบทันที แล้วจึงรายงานในระบบ
              </div>
            )}
          </div>
        </div>
      </Sider>

      <Layout className="min-w-0">
        <Header className="sticky top-0 z-10 flex items-center gap-3 border-b border-line">
          <Button
            type="text"
            aria-label={collapsed ? "ขยายเมนู" : "ย่อเมนู"}
            icon={<MenuIcon size={20} />}
            onClick={toggle}
            className="text-ink-muted!"
          />
          <h1 className="m-0 min-w-0 flex-1 truncate text-lg font-semibold text-ink">
            {current?.label ?? "MEDUP Educational Risk"}
          </h1>

          <Link href="/reports/new" className="hidden sm:block">
            <Button type="primary" icon={<FilePlus2 size={16} />}>
              รายงานเหตุการณ์
            </Button>
          </Link>

          <Badge count={3} size="small" offset={[-4, 4]}>
            <Button type="text" aria-label="การแจ้งเตือน" icon={<Bell size={20} />} className="text-ink-muted!" />
          </Badge>

          <Dropdown menu={{ items: userMenu }} trigger={["click"]} placement="bottomRight">
            <button className="flex cursor-pointer items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-purple-mist">
              <Avatar className="bg-green-soft! text-green-deep!">ลข</Avatar>
              <span className="hidden text-left leading-tight md:block">
                <span className="block text-sm font-medium text-ink">เลขานุการ ตัวอย่าง</span>
                <span className="block text-xs text-ink-muted">เลขานุการ</span>
              </span>
              <ChevronDown size={14} className="hidden text-ink-muted md:block" />
            </button>
          </Dropdown>
        </Header>

        <Content className="p-4 md:p-6">{children}</Content>
      </Layout>
    </Layout>
  );
}
