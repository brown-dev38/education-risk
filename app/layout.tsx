import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import AntdRegistry from "./antd-registry";
import Providers from "./providers";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | MEDUP Educational Risk",
    default: "MEDUP Educational Risk",
  },
  description: "ระบบรายงานและจัดการความเสี่ยงด้านการศึกษา คณะแพทยศาสตร์ มหาวิทยาลัยพะเยา",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className={`${notoSansThai.variable} h-full antialiased`}>
      <body className="min-h-full">
        <AntdRegistry>
          <Providers>{children}</Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
