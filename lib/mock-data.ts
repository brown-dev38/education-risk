// ข้อมูลตัวอย่างสำหรับออกแบบหน้าจอ — จะแทนที่ด้วยข้อมูลจาก Prisma ภายหลัง
import type { ReportStatus } from "./constants";

export const categories = [
  { id: 1, name: "หลักสูตรและการจัดการเรียนการสอน" },
  { id: 2, name: "การวัดและประเมินผล" },
  { id: 3, name: "การฝึกปฏิบัติทางคลินิก" },
  { id: 4, name: "สวัสดิภาพและความปลอดภัยของผู้เรียน" },
  { id: 5, name: "สิ่งสนับสนุนการเรียนรู้" },
  { id: 6, name: "อื่น ๆ" },
];

/** จำนวนเรื่องในแต่ละสถานะ */
export const statusCounts: Record<ReportStatus, number> = {
  SUBMITTED: 4,
  ASSIGNED: 3,
  IN_PROGRESS: 6,
  PENDING_ASSESSMENT: 3,
  ASSESSED: 1,
  SECRETARY_REVIEW: 2,
  COMMITTEE_REVIEW: 3,
  MEASURE_IN_PROGRESS: 2,
  EXTERNAL_REFERRAL: 1,
  CLOSED: 21,
};

/** ผลประเมินล่าสุดของเรื่องที่ยังไม่ปิด: [likelihood, impact, จำนวนเรื่อง] */
export const riskMatrixCounts: [number, number, number][] = [
  [1, 2, 2],
  [2, 2, 3],
  [2, 3, 2],
  [3, 2, 1],
  [3, 3, 2],
  [1, 5, 1],
  [4, 2, 1],
  [3, 4, 2],
  [4, 4, 1],
  [5, 4, 1],
];

export type ReportRow = {
  id: number;
  code: string;
  title: string;
  department: string;
  status: ReportStatus;
  score: number | null;
  isUrgent: boolean;
  createdAt: string;
  dueDate: string | null;
};

export const recentReports: ReportRow[] = [
  {
    id: 46,
    code: "ER-2569-0046",
    title: "นักศึกษาชั้นปีที่ 4 ได้รับบาดเจ็บจากเข็มระหว่างฝึกปฏิบัติ",
    department: "ภาควิชาศัลยศาสตร์",
    status: "SUBMITTED",
    score: null,
    isUrgent: true,
    createdAt: "2026-11-26",
    dueDate: null,
  },
  {
    id: 45,
    code: "ER-2569-0045",
    title: "ข้อสอบ MCQ รายวิชาเภสัชวิทยามีเฉลยผิด 3 ข้อ",
    department: "งานวัดและประเมินผล",
    status: "IN_PROGRESS",
    score: null,
    isUrgent: false,
    createdAt: "2026-11-24",
    dueDate: "2026-12-08",
  },
  {
    id: 44,
    code: "ER-2569-0044",
    title: "ตารางหมุนเวียนวอร์ดชนกับการสอบย่อย",
    department: "งานบริการการศึกษา",
    status: "COMMITTEE_REVIEW",
    score: 16,
    isUrgent: false,
    createdAt: "2026-11-20",
    dueDate: "2026-12-04",
  },
  {
    id: 43,
    code: "ER-2569-0043",
    title: "ระบบ e-Learning ล่มระหว่างสอบออนไลน์",
    department: "งานเทคโนโลยีสารสนเทศ",
    status: "MEASURE_IN_PROGRESS",
    score: 12,
    isUrgent: false,
    createdAt: "2026-11-15",
    dueDate: "2026-11-25",
  },
  {
    id: 42,
    code: "ER-2569-0042",
    title: "อาจารย์ผู้สอนไม่เพียงพอในรายวิชาเวชศาสตร์ชุมชน",
    department: "ภาควิชาเวชศาสตร์ครอบครัว",
    status: "SECRETARY_REVIEW",
    score: 6,
    isUrgent: false,
    createdAt: "2026-11-10",
    dueDate: "2026-11-30",
  },
  {
    id: 41,
    code: "ER-2569-0041",
    title: "หอพักนักศึกษาแพทย์ ณ รพ.สมทบ ไม่มีระบบรักษาความปลอดภัย",
    department: "หน่วยงานภายนอก (รพ.สมทบ)",
    status: "EXTERNAL_REFERRAL",
    score: null,
    isUrgent: true,
    createdAt: "2026-11-08",
    dueDate: "2026-12-10",
  },
];
