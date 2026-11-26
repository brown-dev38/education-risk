import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = { title: "หน่วยงาน" };

export default function Page() {
  return <ComingSoon title="หน่วยงาน" description="จัดการรายชื่อหน่วยงาน (อยู่ระหว่างพัฒนา)" />;
}
