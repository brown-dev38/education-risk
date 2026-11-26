import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = { title: "เกณฑ์ความเสี่ยง" };

export default function Page() {
  return <ComingSoon title="เกณฑ์ความเสี่ยง" description="ปรับค่าเกณฑ์ของจุดตัดสินใจและคำอธิบายระดับคะแนน (อยู่ระหว่างพัฒนา)" />;
}
