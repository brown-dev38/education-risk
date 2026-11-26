import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = { title: "ผู้ใช้งาน" };

export default function Page() {
  return <ComingSoon title="ผู้ใช้งาน" description="จัดการผู้ใช้และบทบาท (อยู่ระหว่างพัฒนา)" />;
}
