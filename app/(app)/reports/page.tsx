import type { Metadata } from "next";
import ComingSoon from "@/components/coming-soon";

export const metadata: Metadata = { title: "เรื่องทั้งหมด" };

export default function Page() {
  return <ComingSoon title="เรื่องทั้งหมด" description="รายการเรื่องพร้อมตัวกรองตามสถานะ หน่วยงาน หมวดหมู่ และระดับความเสี่ยง (อยู่ระหว่างพัฒนา)" />;
}
