import type { Metadata } from "next";
import ReportForm from "@/components/report-form";

export const metadata: Metadata = { title: "รายงานเหตุการณ์" };

export default function NewReportPage() {
  return <ReportForm />;
}
