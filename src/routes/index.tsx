import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { todaysFocus, user, weekStats, reviewItems } from "@/data/prototype";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fundamental. — Your daily question drill" },
      {
        name: "description",
        content:
          "Fundamental. is a calm, focused drilling app for SKD, UTBK, TPA and more. Pick a topic, answer questions, understand every explanation.",
      },
      { property: "og:title", content: "Fundamental. — Your daily question drill" },
      {
        property: "og:description",
        content: "Less interface. More learning. A serious study tool that gets out of your way.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const reviewCount = reviewItems.length;

  return (
    <Screen>
      <header className="mb-6">
        <p className="text-[15px] font-semibold tracking-[-0.02em]">Fundamental.</p>
        <h1 className="mt-4 text-[27px] font-semibold tracking-[-0.02em]">
          Good evening, {user.name}.
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Preparing for {user.target}</p>
      </header>

      <section className="rounded-xl border border-border bg-surface p-4 shadow-soft">
        <p className="label-xs">Today's Focus</p>
        <p className="mt-2 text-lg font-medium tracking-[-0.015em]">{todaysFocus.name}</p>
        <p className="tabular mt-0.5 text-[13px] text-muted-foreground">
          {todaysFocus.questions} questions · ~{todaysFocus.minutes} min
        </p>
        <Button asChild size="block" className="mt-4">
          <Link
            to="/practice/$examId/$subtestId/$materialId"
            params={{
              examId: todaysFocus.examId,
              subtestId: todaysFocus.subtestId,
              materialId: todaysFocus.materialId,
            }}
          >
            Continue
          </Link>
        </Button>
      </section>

      <div className="mt-4 flex items-center justify-between border-b border-border pb-4">
        <p className="text-[15px]">
          <span className="tabular font-semibold">{user.streak} day</span> streak
        </p>
        <div className="flex gap-1">
          {weekStats.days.map((d, i) => (
            <span
              key={i}
              className={`h-1.5 w-4 rounded-full ${d.active ? "bg-primary" : "bg-border-strong"}`}
            />
          ))}
        </div>
      </div>

      <Link to="/review" className="tap block border-b border-border py-4">
        <div className="flex items-center gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-medium tracking-[-0.01em]">Needs Review</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              {reviewCount} topics need another look
            </p>
          </div>
          <span className="rounded-lg border border-border-strong px-3 py-1.5 text-[13px] font-medium">
            Review
          </span>
        </div>
      </Link>

      <section className="pt-5">
        <div className="flex items-baseline justify-between">
          <p className="label-xs">This Week</p>
          <Link to="/progress" className="text-[13px] text-primary">
            Details
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3">
          <Stat value={String(weekStats.questions)} label="Questions" />
          <Stat value={`${weekStats.accuracy}%`} label="Accuracy" />
          <Stat value={weekStats.studyTime} label="Study time" />
        </div>
        <div className="mt-4 flex items-end justify-between gap-2">
          {weekStats.days.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div
                className="w-full rounded-sm bg-primary/80"
                style={{
                  height: `${8 + d.intensity * 9}px`,
                  opacity: d.active ? 0.35 + d.intensity * 0.16 : 0.12,
                }}
              />
              <span className="text-[11px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </section>
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
