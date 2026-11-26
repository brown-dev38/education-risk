"use client";

import { ConfigProvider } from "antd";
import thTH from "antd/locale/th_TH";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { Toaster } from "react-hot-toast";
import { antdTheme } from "@/lib/theme";

dayjs.extend(buddhistEra);
dayjs.locale("th");

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={antdTheme} locale={thTH}>
      {children}
      <Toaster position="top-right" toastOptions={{ style: { fontFamily: "var(--font-thai)" } }} />
    </ConfigProvider>
  );
}
