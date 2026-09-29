import { createFileRoute, Link } from "@tanstack/react-router";
import { Screen, PageHeader } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { reviewItems, todaysFocus } from "@/data/prototype";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Needs review — Fundamental." },
      { name: "description", content: "The topics and questions that deserve another look." },
      { property: "og:title", content: "Needs review — Fundamental." },
      { property: "og:description", content: "The topics and questions that deserve another look." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewScreen,
});

function ReviewScreen() {
  const total = reviewItems.reduce((a, b) => a + b.count, 0);

  return (
    <Screen>
      <PageHeader title="Needs Review" caption={`${total} questions across ${reviewItems.length} topics`} back={{ to: "/" }} />
      <div className="divide-y divide-border border-y border-border">
        {reviewItems.map((item) => (
          <div key={item.material} className="flex items-center gap-4 py-3.5">
            <div className="min-w-0 flex-1">
              <p className="label-xs">{item.subtest}</p>
              <p className="mt-1 text-[15px] font-medium tracking-[-0.01em]">{item.material}</p>
            </div>
            <span className="tabular text-[13px] text-muted-foreground">{item.count} questions</span>
          </div>
        ))}
      </div>
      <Button asChild size="block" className="mt-6">
        <Link
          to="/session/$examId/$subtestId/$materialId"
          params={{
            examId: todaysFocus.examId,
            subtestId: todaysFocus.subtestId,
            materialId: todaysFocus.materialId,
          }}
          search={{ mode: "learn" }}
        >
          Start review
        </Link>
      </Button>
    </Screen>
  );
}
