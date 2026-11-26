"use client";

import { Button, Card, Checkbox, Col, DatePicker, Form, Input, Row, Select, Steps, Switch, Upload } from "antd";
import { Paperclip, ShieldCheck, Siren } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { Dayjs } from "dayjs";
import { categories } from "@/lib/mock-data";

type FormValues = {
  title: string;
  categoryId: number;
  occurredAt: Dayjs;
  location?: string;
  description: string;
  isUrgent: boolean;
  isAnonymous: boolean;
};

export default function ReportForm() {
  const [form] = Form.useForm<FormValues>();
  const router = useRouter();
  const isUrgent = Form.useWatch("isUrgent", form);

  const onFinish = () => {
    // TODO: เปลี่ยนเป็น Server Action submitReport เมื่อเชื่อมฐานข้อมูล
    toast.success("ส่งรายงานแล้ว (ตัวอย่าง: ยังไม่บันทึกลงฐานข้อมูล)");
    form.resetFields();
  };

  return (
    <div className="mx-auto max-w-300">
      <div className="mb-5">
        <h2 className="m-0 text-xl font-semibold text-ink">รายงานเหตุการณ์ความเสี่ยงด้านการศึกษา</h2>
        <p className="m-0 mt-1 text-sm text-ink-muted">
          กรอกข้อมูลเท่าที่ทราบ เลขานุการจะคัดกรองและส่งต่อหน่วยงานที่เกี่ยวข้อง
        </p>
      </div>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <Card>
            <Form<FormValues>
              form={form}
              layout="vertical"
              requiredMark="optional"
              initialValues={{ isUrgent: false, isAnonymous: false }}
              onFinish={onFinish}
            >
              <Form.Item name="title" label="หัวข้อเหตุการณ์" rules={[{ required: true, message: "กรุณาระบุหัวข้อ" }]}>
                <Input placeholder="สรุปเหตุการณ์สั้น ๆ" maxLength={200} />
              </Form.Item>

              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="categoryId" label="หมวดหมู่" rules={[{ required: true, message: "กรุณาเลือกหมวดหมู่" }]}>
                    <Select
                      placeholder="เลือกหมวดหมู่"
                      options={categories.map((c) => ({ value: c.id, label: c.name }))}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="occurredAt"
                    label="วันและเวลาที่เกิดเหตุ"
                    rules={[{ required: true, message: "กรุณาระบุวันที่เกิดเหตุ" }]}
                  >
                    <DatePicker showTime={{ format: "HH:mm" }} format="D MMM BBBB HH:mm" className="w-full" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="location" label="สถานที่ / รายวิชา / ชั้นปี">
                <Input placeholder="เช่น หอผู้ป่วยศัลยกรรมชาย, รายวิชา 361xxx, ชั้นปีที่ 4" />
              </Form.Item>

              <Form.Item
                name="description"
                label="รายละเอียดเหตุการณ์"
                rules={[{ required: true, message: "กรุณาอธิบายเหตุการณ์" }]}
              >
                <Input.TextArea
                  rows={6}
                  showCount
                  maxLength={3000}
                  placeholder="เกิดอะไรขึ้น ใครได้รับผลกระทบ และได้ดำเนินการอะไรไปแล้วบ้าง"
                />
              </Form.Item>

              <Form.Item label="หลักฐานประกอบ" extra="รองรับรูปภาพ, PDF, Word ไม่เกิน 10 MB ต่อไฟล์">
                <Upload.Dragger multiple beforeUpload={() => false} accept="image/*,.pdf,.doc,.docx">
                  <div className="flex flex-col items-center gap-1 py-2 text-ink-muted">
                    <Paperclip size={22} className="text-purple" />
                    <span className="text-sm">ลากไฟล์มาวาง หรือคลิกเพื่อเลือกไฟล์</span>
                  </div>
                </Upload.Dragger>
              </Form.Item>

              <div
                className={`mb-4 rounded-xl border p-4 transition-colors ${
                  isUrgent ? "border-[#F3C9CC] bg-[#FDF1F2]" : "border-line bg-purple-mist/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 font-medium text-ink">
                      <Siren size={16} className="text-[#B4232C]" /> เหตุเร่งด่วน
                    </div>
                    <div className="mt-0.5 text-sm text-ink-muted">
                      มีผู้ได้รับอันตราย หรือต้องการความช่วยเหลือทันที ระบบจะแจ้งเลขานุการและหัวหน้าหน่วยงานทันที
                    </div>
                  </div>
                  <Form.Item name="isUrgent" valuePropName="checked" noStyle>
                    <Switch aria-label="เหตุเร่งด่วน" />
                  </Form.Item>
                </div>
              </div>

              <Form.Item name="isAnonymous" valuePropName="checked">
                <Checkbox>ไม่เปิดเผยชื่อผู้รายงานต่อหน่วยงานและคณะกรรมการ (เลขานุการยังเห็นชื่อ)</Checkbox>
              </Form.Item>

              <div className="flex justify-end gap-2 border-t border-line pt-4">
                <Button onClick={() => router.back()}>ยกเลิก</Button>
                <Button type="primary" htmlType="submit" danger={!!isUrgent}>
                  {isUrgent ? "ส่งรายงานเร่งด่วน" : "ส่งรายงาน"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <div className="flex flex-col gap-5 lg:sticky lg:top-[88px]">
            <Card title="หลังส่งรายงาน">
              <Steps
                orientation="vertical"
                size="small"
                current={0}
                items={[
                  { title: "เลขานุการคัดกรอง", content: "มอบหมายหน่วยงานตนเองหรือหน่วยงานที่เกี่ยวข้อง" },
                  { title: "หน่วยงานแก้ไข", content: "ดำเนินการแก้ไขพร้อมรายงานผล" },
                  { title: "ประเมิน Risk Matrix", content: "หากยังรุนแรง เกิดบ่อย หรือยุติไม่ได้ จะเข้าคณะกรรมการ" },
                  { title: "แจ้งผลและปิดเรื่อง", content: "คุณจะได้รับแจ้งผลเมื่อปิดเรื่อง" },
                ]}
              />
            </Card>
            <div className="flex gap-3 rounded-xl bg-green-mist p-4 text-sm text-green-deep">
              <ShieldCheck size={20} className="shrink-0" />
              <span>ข้อมูลผู้รายงานถูกเก็บเป็นความลับ ใช้เพื่อติดตามและแจ้งผลการดำเนินการเท่านั้น</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
