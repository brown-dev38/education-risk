"use client";

import { Tooltip } from "antd";
import { RISK_LEVEL_META, riskLevelOf, type RiskLevel } from "@/lib/constants";

const LEVELS: RiskLevel[] = ["LOW", "MEDIUM", "HIGH", "EXTREME"];
const AXIS = [1, 2, 3, 4, 5];

/** Heatmap 5×5: แกนตั้ง = ผลกระทบ (5 อยู่บน), แกนนอน = โอกาสเกิด */
export default function RiskMatrix({ counts }: { counts: [number, number, number][] }) {
  const lookup = new Map(counts.map(([l, i, n]) => [`${l}-${i}`, n]));

  return (
    <div>
      <div className="flex gap-2">
        <div className="flex w-5 items-center justify-center">
          <span className="-rotate-90 whitespace-nowrap text-xs text-ink-muted">ผลกระทบ (Impact)</span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-[20px_repeat(5,1fr)] gap-0.5">
            {[...AXIS].reverse().map((impact) => (
              <Row key={impact} impact={impact} lookup={lookup} />
            ))}
            <div />
            {AXIS.map((l) => (
              <div key={l} className="pt-1 text-center text-xs text-ink-muted">
                {l}
              </div>
            ))}
          </div>
          <div className="mt-1 text-center text-xs text-ink-muted">โอกาสเกิด (Likelihood)</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
        {LEVELS.map((lv) => (
          <span key={lv} className="flex items-center gap-1.5 text-xs text-ink-muted">
            <span className="h-3 w-3 rounded-sm" style={{ background: RISK_LEVEL_META[lv].bg }} />
            {RISK_LEVEL_META[lv].label} ({RISK_LEVEL_META[lv].range})
          </span>
        ))}
      </div>
    </div>
  );
}

function Row({ impact, lookup }: { impact: number; lookup: Map<string, number> }) {
  return (
    <>
      <div className="flex items-center justify-center text-xs text-ink-muted">{impact}</div>
      {AXIS.map((likelihood) => {
        const score = likelihood * impact;
        const level = riskLevelOf(score);
        const meta = RISK_LEVEL_META[level];
        const n = lookup.get(`${likelihood}-${impact}`) ?? 0;
        return (
          <Tooltip
            key={likelihood}
            title={`โอกาสเกิด ${likelihood} × ผลกระทบ ${impact} = ${score} (${meta.label}) · ${n} เรื่อง`}
          >
            <div
              className="flex aspect-[4/3] cursor-default items-center justify-center rounded-md text-sm font-semibold transition-shadow hover:ring-2 hover:ring-purple"
              style={{ background: meta.bg, color: meta.fg, opacity: n ? 1 : 0.55 }}
            >
              {n || ""}
            </div>
          </Tooltip>
        );
      })}
    </>
  );
}
