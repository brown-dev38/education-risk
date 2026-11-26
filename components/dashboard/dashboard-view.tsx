"use client";

import { Alert, Button, Card, Col, Row, Table, Tag, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { AlertTriangle, CheckCircle2, FolderOpen, Gavel, Siren } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { RISK_LEVEL_META, STATUS_META, riskLevelOf, type ReportStatus } from "@/lib/constants";
import { recentReports, riskMatrixCounts, statusCounts, type ReportRow } from "@/lib/mock-data";
import RiskMatrix from "./risk-matrix";

// ลำดับขั้นตาม flowchart
const PIPELINE: { label: string; statuses: ReportStatus[] }[] = [
  { label: "รอคัดกรอง / มอบหมาย", statuses: ["SUBMITTED"] },
  { label: "หน่วยงานรับเรื่องและแก้ไข", statuses: ["ASSIGNED", "IN_PROGRESS"] },
  { label: "ประเมิน Risk Matrix", statuses: ["PENDING_ASSESSMENT", "ASSESSED"] },
  { label: "เลขานุการตรวจผลและหลักฐาน", statuses: ["SECRETARY_REVIEW"] },
  { label: "คณะกรรมการพิจารณา", statuses: ["COMMITTEE_REVIEW"] },
  { label: "ดำเนินมาตรการและติดตามผล", statuses: ["MEASURE_IN_PROGRESS"] },
  { label: "ส่งต่อภายนอก", statuses: ["EXTERNAL_REFERRAL"] },
];

const TODAY = dayjs("2026-11-26");

export default function DashboardView() {
  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);
  const closed = statusCounts.CLOSED;
  const open = total - closed;
  const committee = statusCounts.COMMITTEE_REVIEW + statusCounts.MEASURE_IN_PROGRESS;
  const urgent = recentReports.filter((r) => r.isUrgent && r.status !== "CLOSED");
  const pipeline = PIPELINE.map((p) => ({
    ...p,
    count: p.statuses.reduce((s, st) => s + statusCounts[st], 0),
  }));
  const maxStage = Math.max(...pipeline.map((p) => p.count));

  return (
    <div className="mx-auto flex max-w-350 flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="m-0 text-xl font-semibold text-ink">ภาพรวมความเสี่ยงด้านการศึกษา</h2>
          <p className="m-0 mt-1 text-sm text-ink-muted">
            หน่วยงานแก้ไขก่อน แล้วจึงพิจารณามาตรการป้องกันการเกิดซ้ำ
          </p>
        </div>
        <Tag className="m-0!">ข้อมูลตัวอย่าง</Tag>
      </div>

      {urgent.length > 0 && (
        <Alert
          type="error"
          showIcon
          icon={<Siren size={18} />}
          title={`มีเหตุเร่งด่วนที่ยังไม่ปิด ${urgent.length} เรื่อง`}
          description={urgent.map((r) => `${r.code} ${r.title}`).join(" · ")}
          action={
            <Link href="/reports?urgent=1">
              <Button size="small" danger>
                ดูทั้งหมด
              </Button>
            </Link>
          }
        />
      )}

      <Row gutter={[16, 16]}>
        <StatTile label="เรื่องทั้งหมด" value={total} hint="ปีการศึกษา 2569" icon={<FolderOpen size={20} />} tone="purple" />
        <StatTile label="กำลังดำเนินการ" value={open} hint="ยังไม่ปิดเรื่อง" icon={<AlertTriangle size={20} />} tone="amber" />
        <StatTile label="เข้าคณะกรรมการ" value={committee} hint="พิจารณา + ดำเนินมาตรการ" icon={<Gavel size={20} />} tone="purple" />
        <StatTile label="ปิดเรื่องแล้ว" value={closed} hint={`${Math.round((closed / total) * 100)}% ของทั้งหมด`} icon={<CheckCircle2 size={20} />} tone="green" />
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <Card title="เรื่องที่ค้างในแต่ละขั้นตอน" className="h-full">
            <div className="flex flex-col gap-3">
              {pipeline.map((p, idx) => (
                <Tooltip key={p.label} placement="topLeft" title={p.statuses.map((s) => STATUS_META[s].label).join(", ")}>
                  <div className="grid grid-cols-[24px_minmax(0,1fr)_40px] items-center gap-3 sm:grid-cols-[24px_220px_minmax(0,1fr)_40px]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-mist text-xs font-semibold text-purple-deep">
                      {idx + 1}
                    </span>
                    <span className="truncate text-sm text-ink">{p.label}</span>
                    <div className="col-span-3 col-start-2 row-start-2 h-2.5 rounded bg-purple-mist sm:col-span-1 sm:col-start-3 sm:row-start-1">
                      <div
                        className="h-full rounded bg-purple"
                        style={{ width: `${maxStage ? (p.count / maxStage) * 100 : 0}%`, minWidth: p.count ? 6 : 0 }}
                      />
                    </div>
                    <span className="text-right text-sm font-semibold text-ink sm:col-start-4 sm:row-start-1">{p.count}</span>
                  </div>
                </Tooltip>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} xl={10}>
          <Card title="Risk Matrix ของเรื่องที่ยังไม่ปิด" className="h-full">
            <RiskMatrix counts={riskMatrixCounts} />
          </Card>
        </Col>
      </Row>

      <Card
        title="เรื่องล่าสุด"
        extra={<Link href="/reports">ดูทั้งหมด</Link>}
        styles={{ body: { padding: 0 } }}
      >
        <Table<ReportRow>
          rowKey="id"
          columns={columns}
          dataSource={recentReports}
          pagination={false}
          scroll={{ x: 900 }}
        />
      </Card>
    </div>
  );
}

const TONES = {
  purple: "bg-purple-soft text-purple-deep",
  green: "bg-green-soft text-green-deep",
  amber: "bg-[#FFF1BF] text-[#7A5B00]",
} as const;

function StatTile(props: { label: string; value: number; hint: string; icon: React.ReactNode; tone: keyof typeof TONES }) {
  return (
    <Col xs={12} lg={6}>
      <Card className="h-full" styles={{ body: { padding: 20 } }}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="text-sm text-ink-muted">{props.label}</div>
            <div className="mt-1 text-3xl font-bold text-ink tabular-nums">{props.value}</div>
            <div className="mt-1 truncate text-xs text-ink-muted">{props.hint}</div>
          </div>
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${TONES[props.tone]}`}>
            {props.icon}
          </span>
        </div>
      </Card>
    </Col>
  );
}

const columns: TableColumnsType<ReportRow> = [
  {
    title: "เลขที่",
    dataIndex: "code",
    width: 140,
    render: (code: string, r) => (
      <span className="flex items-center gap-1.5 font-medium whitespace-nowrap">
        {r.isUrgent && (
          <Tooltip title="เหตุเร่งด่วน">
            <span className="inline-flex shrink-0 text-[#B4232C]">
              <Siren size={16} aria-label="เหตุเร่งด่วน" />
            </span>
          </Tooltip>
        )}
        {code}
      </span>
    ),
  },
  { title: "เรื่อง", dataIndex: "title", ellipsis: true },
  { title: "หน่วยงาน", dataIndex: "department", width: 200, ellipsis: true },
  {
    title: "สถานะ",
    dataIndex: "status",
    width: 170,
    render: (s: ReportStatus) => <Tag color={STATUS_META[s].color}>{STATUS_META[s].label}</Tag>,
  },
  {
    title: "ระดับความเสี่ยง",
    dataIndex: "score",
    width: 130,
    render: (score: number | null) => {
      if (score == null) return <span className="text-ink-muted">ยังไม่ประเมิน</span>;
      const meta = RISK_LEVEL_META[riskLevelOf(score)];
      return <Tag color={meta.tag}>{`${meta.label} (${score})`}</Tag>;
    },
  },
  {
    title: "กำหนดเสร็จ",
    dataIndex: "dueDate",
    width: 130,
    render: (d: string | null) => {
      if (!d) return <span className="text-ink-muted">—</span>;
      const overdue = dayjs(d).isBefore(TODAY, "day");
      return (
        <span className={overdue ? "font-medium text-[#B4232C]" : ""}>
          {dayjs(d).format("D MMM BB")}
          {overdue && " (เกินกำหนด)"}
        </span>
      );
    },
  },
];
