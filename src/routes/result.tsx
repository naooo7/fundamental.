import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/result")({
  validateSearch: (search: Record<string, unknown>) => ({
    correct: Number(search["correct"] ?? 0),
    total: Number(search["total"] ?? 0),
    material: (search["material"] as string) ?? "Practice",
    examId: (search["examId"] as string) ?? "skd",
    subtestId: (search["subtestId"] as string) ?? "tiu",
  }),
  head: () => ({
    meta: [
      { title: "Session result — Fundamental." },
      { name: "description", content: "Your score, accuracy and the questions worth revisiting." },
      { property: "og:title", content: "Session result — Fundamental." },
      { property: "og:description", content: "Your score and the questions worth revisiting." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResultScreen,
});

function ResultScreen() {
  const { correct, total, material } = Route.useSearch();
  const incorrect = Math.max(total - correct, 0);
  const pct = total ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="screen-in mx-auto w-full max-w-[430px] px-5 pb-10 pt-12">
        <p className="label-xs">Completed</p>
        <h1 className="tabular mt-2 text-[44px] font-semibold leading-none tracking-[-0.03em]">
          {correct} / {total}
        </h1>
        <p className="tabular mt-2 text-lg text-muted-foreground">{pct}% accuracy</p>
        <p className="mt-1 text-sm text-muted-foreground">{material}</p>

        <div className="mt-8 divide-y divide-border border-y border-border">
          <Row label="Correct" value={String(correct)} />
          <Row label="Incorrect" value={String(incorrect)} />
          <Row label="Time" value="16m 42s" />
          <Row label="Needs review" value={`${incorrect} questions`} />
        </div>

        <div className="mt-8 space-y-2">
          <Button asChild size="block">
            <Link to="/review">Review mistakes</Link>
          </Button>
          <Button asChild size="block" variant="outline">
            <Link to="/">Done</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <span className="text-[15px] text-muted-foreground">{label}</span>
      <span className="tabular text-[15px] font-medium">{value}</span>
    </div>
  );
}
