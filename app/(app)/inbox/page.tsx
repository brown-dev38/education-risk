import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = { title: "งานรอดำเนินการ" };

export default function Page() {
  return <ComingSoon title="งานรอดำเนินการ" description="งานที่รอคุณคัดกรอง รับเรื่อง ประเมิน หรือพิจารณา (อยู่ระหว่างพัฒนา)" />;
}
