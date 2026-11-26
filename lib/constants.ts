// ค่าคงที่ของ workflow ตาม docs/DESIGN.md ข้อ 4–5

export type ReportStatus =
  | "SUBMITTED"
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "PENDING_ASSESSMENT"
  | "ASSESSED"
  | "SECRETARY_REVIEW"
  | "COMMITTEE_REVIEW"
  | "MEASURE_IN_PROGRESS"
  | "EXTERNAL_REFERRAL"
  | "CLOSED";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "EXTREME";

/** label ภาษาไทย + สี Tag ของ antd */
export const STATUS_META: Record<ReportStatus, { label: string; color: string }> = {
  SUBMITTED: { label: "รอคัดกรอง", color: "default" },
  ASSIGNED: { label: "มอบหมายแล้ว", color: "blue" },
  IN_PROGRESS: { label: "หน่วยงานกำลังแก้ไข", color: "processing" },
  PENDING_ASSESSMENT: { label: "รอประเมิน Risk Matrix", color: "gold" },
  ASSESSED: { label: "รอยืนยันผลประเมิน", color: "gold" },
  SECRETARY_REVIEW: { label: "เลขานุการตรวจผล", color: "cyan" },
  COMMITTEE_REVIEW: { label: "กรรมการพิจารณา", color: "purple" },
  MEASURE_IN_PROGRESS: { label: "ดำเนินมาตรการ", color: "magenta" },
  EXTERNAL_REFERRAL: { label: "ส่งต่อภายนอก", color: "geekblue" },
  CLOSED: { label: "ปิดเรื่อง", color: "green" },
};

export const RISK_LEVEL_META: Record<
  RiskLevel,
  { label: string; range: string; bg: string; fg: string; tag: string }
> = {
  LOW: { label: "ต่ำ", range: "1–4", bg: "#DDF1E4", fg: "#1F6B45", tag: "green" },
  MEDIUM: { label: "ปานกลาง", range: "5–9", bg: "#FFF1BF", fg: "#7A5B00", tag: "gold" },
  HIGH: { label: "สูง", range: "10–16", bg: "#FFDDBF", fg: "#8A4200", tag: "orange" },
  EXTREME: { label: "สูงมาก", range: "17–25", bg: "#F8C9CB", fg: "#8F1D24", tag: "red" },
};

export function riskLevelOf(score: number): RiskLevel {
  if (score >= 17) return "EXTREME";
  if (score >= 10) return "HIGH";
  if (score >= 5) return "MEDIUM";
  return "LOW";
}
