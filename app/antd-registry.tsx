"use client";

import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import CacheEntity from "@ant-design/cssinjs/es/Cache";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";

/**
 * แทน @ant-design/nextjs-registry: ตัวนั้นเรียก createCache() ซึ่งใช้ Math.random()
 * ระหว่าง prerender ทำให้ build ล้มเมื่อเปิด cacheComponents
 * ฝั่ง server จึงสร้าง cache ด้วย id คงที่ ส่วนฝั่ง browser ใช้ createCache() ตามปกติ
 */
export default function AntdRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = useState(() => (typeof window === "undefined" ? new CacheEntity("ssr") : createCache()));

  useServerInsertedHTML(() => {
    const styleText = extractStyle(cache, { plain: true, once: true });
    if (styleText.includes('.data-ant-cssinjs-cache-path{content:"";}')) return null;
    return (
      <style
        id="antd-cssinjs"
        data-rc-order="prepend"
        data-rc-priority="-1000"
        dangerouslySetInnerHTML={{ __html: styleText }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
}
