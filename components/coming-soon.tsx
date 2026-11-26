"use client";

import { Card, Empty } from "antd";

export default function ComingSoon({ title, description }: { title: string; description: string }) {
  return (
    <Card className="mx-auto max-w-350">
      <Empty
        className="py-12"
        description={
          <div>
            <div className="font-medium text-ink">{title}</div>
            <div className="mt-1 text-sm text-ink-muted">{description}</div>
          </div>
        }
      />
    </Card>
  );
}
