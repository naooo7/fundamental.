import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen, PageHeader } from "@/components/app-shell";
import { weekStats, topicBreakdown, reviewItems } from "@/data/prototype";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Fundamental." },
      { name: "description", content: "Questions answered, accuracy, study time and topic strength." },
      { property: "og:title", content: "Progress — Fundamental." },
      { property: "og:description", content: "Questions, accuracy, study time and topic strength." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressScreen,
});

function ProgressScreen() {
  return (
    <Screen>
      <PageHeader title="Progress" />

      <div className="grid grid-cols-3 gap-3 border-y border-border py-4">
        <Stat value={String(weekStats.questions)} label="Questions" />
        <Stat value={`${weekStats.accuracy}%`} label="Accuracy" />
        <Stat value={weekStats.studyTime} label="Study time" />
      </div>

      <section className="pt-5">
        <p className="label-xs">This Week</p>
        <div className="mt-3 flex justify-between">
          {weekStats.days.map((d, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="text-[12px] text-muted-foreground">{d.label}</span>
              <span
                className={`size-2.5 rounded-full ${d.active ? "bg-primary" : "border border-border-strong"}`}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="pt-6">
        <p className="label-xs">Topics</p>
        <div className="mt-2 divide-y divide-border border-y border-border">
          {topicBreakdown.map((t) => (
            <div key={t.name} className="py-3.5">
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-medium">{t.name}</span>
                <span className="tabular text-[14px] text-muted-foreground">{t.accuracy}%</span>
              </div>
              <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-border">
                <div className="h-full rounded-full bg-primary/70" style={{ width: `${t.accuracy}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link to="/review" className="tap mt-4 flex items-center justify-between border-b border-border py-4">
        <div>
          <p className="text-[15px] font-medium">Needs Review</p>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {reviewItems.length} topics need another look
          </p>
        </div>
        <span className="text-muted-foreground/60">›</span>
      </Link>
    </Screen>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="tabular text-xl font-semibold tracking-[-0.02em]">{value}</p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">{label}</p>
    </div>
  );
}
