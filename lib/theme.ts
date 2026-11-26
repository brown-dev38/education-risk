import type { ThemeConfig } from "antd";

/**
 * โทนสีหลักของระบบ: ม่วง + เขียว พาสเทล (อิงจากโลโก้คณะ)
 * ใช้ค่าเดียวกันนี้ทั้งใน antd theme และ CSS variables ใน globals.css
 */
export const palette = {
  purple: "#7E57C2", // primary (ปุ่ม, ลิงก์, เมนูที่เลือก)
  purpleDeep: "#5B3A99", // ตัวอักษรบนพื้นม่วงอ่อน
  purpleSoft: "#E9E0F8", // พื้นม่วงพาสเทล
  purpleMist: "#F4EFFC", // พื้นม่วงจางมาก
  green: "#3F9B6E", // success / accent
  greenDeep: "#1F6B45",
  greenSoft: "#DDF1E5", // พื้นเขียวพาสเทล
  greenMist: "#EEF7F1",
  ink: "#2E2A3A", // ตัวอักษรหลัก
  inkMuted: "#6E6880", // ตัวอักษรรอง
  line: "#E7E2F0", // เส้นขอบ
  page: "#F7F5FB", // พื้นหลังหน้า
} as const;

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: palette.purple,
    colorInfo: palette.purple,
    colorSuccess: palette.green,
    colorLink: palette.purpleDeep,
    colorText: palette.ink,
    colorTextSecondary: palette.inkMuted,
    colorBorderSecondary: palette.line,
    colorBgLayout: palette.page,
    borderRadius: 10,
    fontFamily: "var(--font-thai), system-ui, sans-serif",
    fontSize: 15,
  },
  components: {
    Layout: {
      headerBg: "#FFFFFF",
      headerHeight: 64,
      headerPadding: "0 20px",
      siderBg: "transparent",
      bodyBg: palette.page,
    },
    Menu: {
      itemBg: "transparent",
      subMenuItemBg: "transparent",
      itemColor: "#4A4458",
      itemHoverBg: "#EFE8FA",
      itemHoverColor: palette.purpleDeep,
      itemSelectedBg: palette.purpleSoft,
      itemSelectedColor: palette.purpleDeep,
      groupTitleColor: "#9A93A8",
      itemBorderRadius: 10,
      itemMarginInline: 10,
      iconSize: 18,
      collapsedIconSize: 18,
      activeBarBorderWidth: 0,
    },
    Card: {
      headerFontSize: 16,
    },
    Table: {
      headerBg: palette.purpleMist,
      headerColor: palette.purpleDeep,
    },
  },
};
