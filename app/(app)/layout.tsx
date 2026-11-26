import { Suspense } from "react";
import Image from "next/image";
import AppShell from "@/components/app-shell";

/**
 * antd (และ rc-component) อ่านค่า Date.now()/Math.random() ระหว่าง render
 * ซึ่ง cacheComponents ไม่อนุญาตใน static shell จึงให้ส่วนนี้ render ตอน request ผ่าน Suspense
 * (หน้าในกลุ่มนี้ต้องอ่าน session ผู้ใช้อยู่แล้ว จึงเป็น dynamic อยู่ดี)
 */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ShellFallback />}>
      <AppShell>{children}</AppShell>
    </Suspense>
  );
}

function ShellFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-page">
      <div className="flex flex-col items-center gap-3 text-ink-muted">
        <Image src="/logo.png" alt="" width={64} height={64} priority className="animate-pulse" />
        <span className="text-sm">กำลังโหลด…</span>
      </div>
    </div>
  );
}
