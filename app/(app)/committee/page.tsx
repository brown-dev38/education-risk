import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = { title: "วาระคณะกรรมการ" };

export default function Page() {
  return <ComingSoon title="วาระคณะกรรมการ" description="เรื่องที่รอคณะกรรมการพิจารณาและกำหนดมาตรการ (อยู่ระหว่างพัฒนา)" />;
}
